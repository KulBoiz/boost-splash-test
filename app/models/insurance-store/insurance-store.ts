import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"
import { unionBy } from "../../utils/lodash-utils"

/**
 * Model description here for TypeScript hints.
 */
const PagingParamsModel = types.optional(
  types.model({
    page: 1,
    limit: 20,
  }),
  {},
)

type PagingParamsType = Instance<typeof PagingParamsModel>

export const InsuranceStoreModel = types
  .model("InsuranceStore")
  .extend(withEnvironment)
  .props({
    isFirstTime: types.optional(types.boolean, true),
    pagingListBuy: PagingParamsModel,
    pagingListClaim: PagingParamsModel,
    isLoadingMore: false,
    isRefreshing: false,
    listBuyTotal: types.optional(types.number, 0),
    listClaimTotal: types.optional(types.number, 0),
    listBuy: types.frozen([]),
    listClaim: types.frozen([]),
    listHospital: types.frozen([])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setIsFirstTime: flow(function* isFirstTime() {
      self.isFirstTime = false
      return self.isFirstTime
    }),
    buyInsurance: flow(function* buyInsurance(data) {
      const api = new BaseApi(self.environment.api)
      const result = yield api.post("transactions/public/insurance-multiple", data)

      return result
    }),

    filterInsurance: flow(function* filterInsurance() {
      const api = new BaseApi(self.environment.api)
      const result = yield api.get(`products/public/organization/insurances/insurances`)

      return result
    }),

    getListBuyInsurance: flow(function* getListBuyInsurance(
      params?: any,
      pagingParams?: PagingParamsType,
      isRefresh = false,
    ) {
      if (self.listBuy.length === self.listBuyTotal && pagingParams?.page !== 1){
        return
      }
      if (isRefresh || pagingParams?.page === 1) {
        self.listBuy = []
      }
      if (isRefresh) {
        self.isRefreshing = true
      } else {
        self.isLoadingMore = true
      }
      const api = new BaseApi(self.environment.api)
      const result = yield api.get("deals", {
        filter: {
          order: ['createdAt desc'],
          where: {
            type: "insurances",
            category: params?.category || undefined,
            status: {
              nin: ['pending']
            }
          },
          include: [
            {relation: "source"},
            {relation: "user"},
            { relation: "category" },
            {relation: "transaction"},
            {relation: "product",
              scope: {
                include: [
                  {relation: 'org'}
                ]
              }
            }
          ],
          limit: pagingParams?.limit,
          skip: (pagingParams?.page - 1) * pagingParams?.limit,
        },
        page: pagingParams?.page ?? 1,
      })

      const data = result?.data?.data

      if (result.kind === "ok") {
        self.listBuyTotal = result.data.total
        self.isRefreshing = false
        self.isLoadingMore = false
        if (isRefresh || pagingParams?.page === 1) {
          self.listBuy = data
        } else {
          self.listBuy = unionBy(self.listBuy, data, "id")
        }
      }
      else{
        self.isRefreshing = false
        self.isLoadingMore = false
      }
      return result
    }),

    getListClaimInsurance: flow(function* getListClaimInsurance(
      params?: any,
      pagingParams?: PagingParamsType,
      isRefresh = false,
    ) {
      if (self.listClaimTotal === self.listClaim.length && pagingParams?.page !== 1){
        return
      }
      if (isRefresh || pagingParams?.page === 1) {
      self.listClaim = []
    }
      if (isRefresh) {
        self.isRefreshing = true
      } else {
        self.isLoadingMore = true
      }

      const api = new BaseApi(self.environment.api)
      const result = yield api.get("tasks", {
        filter: {
          where: {
            type: {
              inq: ["claim_insurance"]
            },
            status: {
              nin:["deleted"]
            }
          },
          include: [
            {relation: "user"},
            {relation: "product",
              scope: {
                include: [
                  {relation: 'org'},
                  {relation: 'category'}
                ]
              }
            },
          ],
          limit: pagingParams?.limit,
          skip: (pagingParams?.page - 1) * pagingParams?.limit,
        },
        page: pagingParams?.page ?? 1,
      })

      const data = result?.data?.data

      if (result.kind === "ok") {
        self.listClaimTotal = result.data.total
        self.listClaim = data
        self.isRefreshing = false
        self.isLoadingMore = false
        if (isRefresh || pagingParams?.page === 1) {
          self.listClaim = data
        } else {
          self.listClaim = unionBy(self.listClaim, data, "id")
        }
      }
      else{
        self.isRefreshing = false
        self.isLoadingMore = false
      }
      return result
    }),

    getListHospital: flow(function* getListHospital(
      id: string,
      isRefresh = false
    ) {
      if (isRefresh) {
        self.isRefreshing = true
      } else {
        self.isLoadingMore = true
      }
      self.listHospital = []
      const api = new BaseApi(self.environment.api)
      const result = yield api.get("organization-products", {
        filter: {
          where: {
            productId: id
          },
          include: [
            {relation: 'organization'}
          ]
        }
      })

      const data = result?.data?.data

      if (result.kind === "ok") {
        self.listHospital = data
        self.isRefreshing = false
        self.isLoadingMore = false
      }
      else{
        self.isRefreshing = false
        self.isLoadingMore = false
      }
      return result
    }),

    getCategoryInsurance:  flow(function* get() {
      const api = new BaseApi(self.environment.api)
      const result = yield api.get("categories/public", {
        filter: {
          where: {
            type: 'insurance_products',
            status: 'active'
          },
          limit: 100,
          fields: ['id', 'icon', 'name', 'name', 'productCategory']
        },
        page: 1,
      })
      
      return result
    }),

    getOrgInsurance:  flow(function* get() {
      const api = new BaseApi(self.environment.api)
      const result = yield api.get(`products/public/organization/insurances`)
      
      return result
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type InsuranceStoreType = Instance<typeof InsuranceStoreModel>
export interface InsuranceStore extends InsuranceStoreType { }
type InsuranceStoreSnapshotType = SnapshotOut<typeof InsuranceStoreModel>
export interface InsuranceStoreSnapshot extends InsuranceStoreSnapshotType { }
export const createInsuranceStoreDefaultModel = () => types.optional(InsuranceStoreModel, {})
