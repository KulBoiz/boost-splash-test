import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProductApi } from "../../services/api/product-api"
import { QuestionGroupApi } from "../../services/api/question-group-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { BaseApi } from "../../services/api/base-api"
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

export const ProductStoreModel = types
  .model("ProductStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    pagingProduct: PagingParamsModel,
    products: types.frozen([]),
    totalProduct: types.frozen(0),
    records: types.frozen([]),
    productDetail: types.frozen({}),
    questionGroups: types.frozen([]),
    transactionInsurance: types.frozen({}),
    isLoadingMore: false,
    isRefreshing: false
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  }))  .actions((self) => ({
    get: flow(function* get(params?: string) {
      self.records = []

      const api = new ProductApi(self.environment.api)
      const result = yield api.get(params)
      const data = result?.data?.data

      if (data) {
        self.records = data
      }

      if (result.kind !== "ok") {
        return result
      }

      if (data) {
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getProductByProject: flow(function* get(params?: string) {
      const api = new BaseApi(self.environment.api)
      const result = yield api.get('product-details/app/project/public', params)
      const data = result?.data

      if (result.kind !== "ok") {
        return data
      }

      if (data) {
        return {
          kind: "ok",
          data,
        }
      }
    }),


    getProductFilter: flow(function* getProductFilter(type,time) {
      const result = yield self.api.get(`app/home/${type}/${time}`, {
        filter: {
          where: {
            status: 'approved'
          }
        }
      })
      const data = result?.data
      if (data) {
        self.products = data
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getProducts: flow(function* getProducts(
      time,
      pagingParams?: PagingParamsType,
      isRefresh = false,
      isLoading = false,
    ) {
      if (isRefresh) {
        self.isRefreshing = true
      }
      if (isLoading) {
        self.isLoadingMore = true
      }
      if (self.products.length === self.totalProduct && pagingParams?.page !== 1){
        return
      }
      const result = yield self.api.get(`product-details/app/home/real_estate/${time}`, {
        filter: {
          where: {
            status: 'approved'
          },
          include: [
            { relation: 'product'},
            { relation: 'org'},
          ],
          limit: pagingParams?.limit,
          skip: (pagingParams?.page - 1) * pagingParams?.limit,
        },
        page: pagingParams?.page ?? 1,
      })

      const data = result?.data?.data

      if (result?.data) {
        self.totalProduct = result?.data?.total
        self.isRefreshing = false
        self.isLoadingMore = false
        if (pagingParams?.page === 1) {
          self.products = data
        } else {
          self.products = unionBy(self.products, data, "id")
        }
      }
      else {
        self.totalProduct = 0
        self.products = []
        self.isRefreshing = false
        self.isLoadingMore = false
      }
    }),

    getDetail: flow(function* getDetail(id: string) {
      self.productDetail = {}
      self.questionGroups = []

      const api = new ProductApi(self.environment.api)
      const apiQuestion = new QuestionGroupApi(self.environment.api)
      const result = yield api.getDetail(id)
      const data = result?.data
      self.productDetail = data

      if (data?.questionGroupId) {
        const resultQuestionGroup = yield apiQuestion.getDetail(data?.questionGroupId)
        self.questionGroups = resultQuestionGroup?.data
      }

      if (result.kind !== "ok") {
        return result
      }

      if (data) {
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getTransactionInsurance: flow(function* getTransactionInsurance(productId: string, search: string) {
      self.transactionInsurance = {}

      const api = new ProductApi(self.environment.api)
      const result = yield api.getTransactionInsurance(productId, search)
      const data = result?.data
      self.transactionInsurance = data

      if (result.kind !== "ok") {
        return result
      }

      if (data) {
        return {
          kind: "ok",
          data,
        }
      }
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ProductStoreType = Instance<typeof ProductStoreModel>
export interface ProductStore extends ProductStoreType {}
type ProductStoreSnapshotType = SnapshotOut<typeof ProductStoreModel>
export interface ProductStoreSnapshot extends ProductStoreSnapshotType {}
export const createProductStoreDefaultModel = () => types.optional(ProductStoreModel, {})
