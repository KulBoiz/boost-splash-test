import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProductApi } from "../../services/api/product-api"
import { QuestionGroupApi } from "../../services/api/question-group-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { BaseApi } from "../../services/api/base-api"

/**
 * Model description here for TypeScript hints.
 */
export const ProductStoreModel = types
  .model("ProductStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    products: types.frozen([]),
    records: types.frozen([]),
    productDetail: types.frozen({}),
    questionGroups: types.frozen([]),
    transactionInsurance: types.frozen({}),
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

    getProducts: flow(function* getProducts(type,time) {
      const result = yield self.api.get(`product-details/app/home/${type}/${time}`)
      const data = result?.data
      console.log(data)
      if (data) {
        self.products = data
        return {
          kind: "ok",
          data,
        }
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
