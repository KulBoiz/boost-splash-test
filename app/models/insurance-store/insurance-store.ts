import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"

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
    listClaim: types.frozen([])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setIsFirstTime: flow(function* isFirstTime() {
      self.isFirstTime = false
      return self.isFirstTime
    }),
    buyInsurance: flow(function* buyInsurance(data) {
      const api = new BaseApi(self.environment.api)
      const result = yield api.post("/transactions/public/insurance-multiple", data)

      return result
    }),

    getListBuyInsurance: flow(function* getListBuyInsurance(
      params?: any,
      pagingParams?: PagingParamsType,
      isRefresh = false,
    ) {
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
            {relation: "category"},
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
        self.listBuy = data
        self.isRefreshing = false
        self.isLoadingMore = false
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
      }
      else{
        self.isRefreshing = false
        self.isLoadingMore = false
      }
      return result
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type InsuranceStoreType = Instance<typeof InsuranceStoreModel>
export interface InsuranceStore extends InsuranceStoreType { }
type InsuranceStoreSnapshotType = SnapshotOut<typeof InsuranceStoreModel>
export interface InsuranceStoreSnapshot extends InsuranceStoreSnapshotType { }
export const createInsuranceStoreDefaultModel = () => types.optional(InsuranceStoreModel, {})
