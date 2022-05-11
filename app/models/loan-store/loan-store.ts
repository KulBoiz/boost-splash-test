import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { CommentApi } from "../../services/api/comment-api"
import { DocumentTemplateApi } from "../../services/api/document-template"

import { LoanApi } from "../../services/api/loan-api"
import { TransactionApi } from "../../services/api/transaction-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */

const filter = {
  "order": "createdAt asc",
  "limit": 10,
  "where": {
    "status": {
      "nin": [
        "deleted"
      ]
    },
    "searchingRule": "single"
  },
  "include": [
    {
      "relation": "user"
    },
    {
      "relation": "category"
    },
    {
      "relation": "assignee"
    },
    {
      "relation": "product"
    },
    {
      "relation": "dealDetails"
    }
  ]
}

export const LoanStoreModel = types
  .model("LoanStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    id: types.optional(types.string, ''),
    records: types.frozen([]),
    total: types.optional(types.number, 0),
    recordDetail: types.frozen({}),
    products: types.frozen([]),
    productDetail: types.frozen({}),
    limit: types.optional(types.number, 10),
    page: types.optional(types.number, 1),
    comments: types.frozen([]),
    loanDetail: types.frozen({}),
    histories: types.frozen([]),
    files: types.frozen([]),
    templates: types.frozen({}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getLoanDetail: flow(function* getLoanDetail(id: string) {
      const loanApi = new LoanApi(self.environment.api)
      const commentApi =  new CommentApi(self.environment.api)
      const documentApi = new DocumentTemplateApi(self.environment.api)

      const result = yield loanApi.requestLoanDetail(id)
      const data = result.data
      self.loanDetail = data

      const resultComment = yield commentApi.requestComment(id)
      self.comments = resultComment?.data?.data

      const resultHistory = yield loanApi.requestLoanHistory(id)
      self.histories = resultHistory?.data

      const resultFiles = yield documentApi.loadTemplate(data?.documentTemplateId)
      self.templates = resultFiles?.data?.data
      const resultTemplates = yield documentApi.loadFileTemplate(data?.documentTemplateId ,id)
      self.files = resultTemplates?.data?.data

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

    requestCounselling: flow(function* requestCounselling(customerName: string, email: string, phone: string) {
      const loanApi = new LoanApi(self.environment.api)
      const userId = new LoanApi(self?.rootStore?.authStoreModel.userId)
      const result = yield loanApi.requestCounselling(userId.api, customerName, email, phone)
      const data = result.data

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

    createRequestCounselling: flow(function* createRequestCounselling(email: string, fullName: string, tel: string, note?: string) {
      const loanApi = new LoanApi(self.environment.api)
      const result = yield loanApi.createRequestCounselling(email, fullName, tel, note)
      const data = result.data

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

    getRecords: flow(function* getRecords() {
      const loanApi = new LoanApi(self.environment.api)
      const result = yield loanApi.getRecords()
      if (result.kind !== "ok") {
        return result
      }
      const data = result?.data?.data
      const total = result?.data?.total

      if (data) {
        self.records = data
        self.total = total
        self.page = 1
        return {
          kind: "ok",
          data,
        }
      }
    }),

    loadMoreRecords: flow(function* loadMoreRecords() {
      const loanApi = new LoanApi(self.environment.api)

      self.page = self.page + 1

      const param = {
        page: self.page + 1,
        "filter": filter
      }

      const result = yield loanApi.loadMoreRecords(param)
      if (result.kind !== "ok") {
        return result
      }
      const data = result?.data?.data
      const oldData: any = [...self.records]
      if (data) {
        const newData: any = oldData.concat(data)
        self.page += 1
        self.records = newData
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getRecordDetail: flow(function* getRecordDetail(id: string) {
      const loanApi = new LoanApi(self.environment.api)
      const result = yield loanApi.getRecordDetail(id)
      if (result.kind !== "ok") {
        return result
      }
      const data = result.data
      if (data) {
        self.recordDetail = data
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getProducts: flow(function* getProducts() {
      const loanApi = new LoanApi(self.environment.api)
      const result = yield loanApi.getProducts()
      if (result.kind !== "ok") {
        return result
      }
      const data = result.data
      if (data) {
        self.products = data
        self.page = 1
        return {
          kind: "ok",
          data,
        }
      }
    }),

    loadMoreProducts: flow(function* loadMoreProducts() {
      const loanApi = new LoanApi(self.environment.api)

      self.page = self.page + 1

      const param = {
        page: self.page + 1,
      }

      const result = yield loanApi.loadMoreProducts(param)
      if (result.kind !== "ok") {
        return result
      }
      const data = result?.data?.data
      const oldData: any = [...self.records]
      if (data) {
        const newData: any = oldData.concat(data)
        self.page += 1
        self.products = newData
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getProductDetail: flow(function* getProductDetail(id: string) {
      const loanApi = new LoanApi(self.environment.api)
      const result = yield loanApi.getProductDetail(id)
      if (result.kind !== "ok") {
        return result
      }
      const data = result.data
      if (data) {
        self.productDetail = data
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getTransaction: flow(function* getTransaction(dealId: string, dealDetailId: string) {
      const transactionApi = new TransactionApi(self.environment.api)
      const commentApi = new CommentApi(self.environment.api)
      
      const resultComment = yield commentApi.requestComment(dealDetailId)
      self.comments = resultComment?.data?.data

      const result = yield transactionApi.getTransaction(dealId, dealDetailId)
      
      if (result.kind !== "ok") {
        return result
      }
      const data = result.data
      if (data) {
        self.productDetail = data
        return {
          kind: "ok",
          data,
        }
      }
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getAllData: () => {
      self.getRecords()
      self.getProducts()
    },
  }))

type LoanStoreType = Instance<typeof LoanStoreModel>
export interface LoanStore extends LoanStoreType { }
type LoanStoreSnapshotType = SnapshotOut<typeof LoanStoreModel>
export interface LoanStoreSnapshot extends LoanStoreSnapshotType { }
export const createLoanStoreDefaultModel = () => types.optional(LoanStoreModel, {})
