import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
// import { CommentApi } from "../../services/api/comment-api"
import { DocumentTemplateApi } from "../../services/api/document-template"

import { LoanApi } from "../../services/api/loan-api"
import { TransactionApi } from "../../services/api/transaction-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */

const filter = {
  limit: 20,
  where: {
    type: {
      inq: ["INTRODUCE_BUYER", "WANT_TO_BUY", "counselling"],
    },
    belongOrgType: "sub_org",
  },
  include: [
    {
      relation: "user",
    },
    {
      relation: "assignee",
    },
    {
      relation: "product",
    },
  ],
}

const filterProduct = {
  limit: 20,
  where: { status: "approved" },
  include: [{ relation: "product" }, { relation: "org" }],
}

const path = "tasks"

export const LoanStoreModel = types
  .model("LoanStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    id: types.optional(types.string, ""),
    records: types.frozen([]),
    totalRecord: types.optional(types.number, 0),
    total: types.optional(types.number, 0),
    recordDetail: types.frozen({}),
    products: types.frozen([]),
    productDetail: types.frozen({}),
    limit: types.optional(types.number, 20),
    page: types.optional(types.number, 1),
    // comments: types.frozen([]),
    loanDetail: types.frozen({}),
    histories: types.frozen([]),
    files: types.frozen([]),
    templates: types.frozen([]),
    task: types.frozen({}),
    feedback: types.frozen({}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setTaskDetail: (task) => {
      self.task = task
    },
    getLoanDetail: flow(function* getLoanDetail(id: string) {
      self.loanDetail = {}
      // self.comments = []
      self.histories = []
      self.templates = []
      self.files = []
      self.task = {}
      self.feedback = {}

      const api = new BaseApi(self.environment.api)
      const loanApi = new LoanApi(self.environment.api)
      // const commentApi = new CommentApi(self.environment.api)
      const documentApi = new DocumentTemplateApi(self.environment.api)

      const resultDetail = yield loanApi.getRecordDetail(id)
      self.task = resultDetail.data

      const resultFeedBack = yield api.get(`${path}/bank-feedbacks/${id}`, {
        filter: {
          limit: 20,
          skip: 0,
          where: {
            statusResponse: "all",
          },
        },
      })
      self.feedback = resultFeedBack.data

      const result = yield loanApi.requestLoanDetail(id)
      const deal = result.data
      self.loanDetail = deal

      // if (deal) {
      //   const resultComment = yield commentApi.requestComment(deal?.id)
      //   self.comments = resultComment?.data?.data
      // }

      const resultHistory = yield loanApi.requestLoanHistory(id)
      self.histories = resultHistory?.data

      if (deal?.documentTemplateId) {
        const resultFiles = yield documentApi.loadTemplate(deal?.documentTemplateId)
        self.templates = resultFiles?.data?.data
        const resultTemplates = yield documentApi.loadFileTemplate(
          deal?.documentTemplateId,
          deal?.id,
        )
        self.files = resultTemplates?.data?.data
      }

      if (result.kind !== "ok") {
        return result
      }

      if (deal) {
        return {
          kind: "ok",
          deal,
        }
      }
    }),

    uploadDocumentTemplateFile: flow(function* uploadDocumentTemplateFile(
      documentTemplateId,
      body,
    ) {
      const documentApi = new DocumentTemplateApi(self.environment.api)
      const result = yield documentApi.uploadDocumentTemplateFile(documentTemplateId, body)
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

    updateLoanDocument: flow(function* updateLoanDocument(
      fileId: string,
      documentId: string,
      dealId: string,
    ) {
      const documentApi = new DocumentTemplateApi(self.environment.api)
      const result = yield documentApi.updateFileTemplate(fileId, documentId, dealId)
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

    requestCounselling: flow(function* requestCounselling(
      customerName: string,
      email: string,
      phone: string,
    ) {
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

    createRequestCounselling: flow(function* createRequestCounselling(
      email: string,
      fullName: string,
      tel: string,
      note?: string,
      type?: string,
      productId?: string,
      info?: any
    ) {
      const user: any = new LoanApi(self?.rootStore?.authStoreModel.userId)

      const loanApi = new LoanApi(self.environment.api)
      const result = yield loanApi.createRequestCounselling(email, fullName, tel, note, user?.api, type, productId, info)
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
      self.records = []
      self.totalRecord = 0

      const param = {
        page: 1,
        filter: filter,
      }

      const loanApi = new LoanApi(self.environment.api)
      const result = yield loanApi.getRecords(param)
      if (result.kind !== "ok") {
        return result
      }
      const data = result?.data?.data
      const total = result?.data?.total

      if (data) {
        self.records = data
        self.totalRecord = total
        self.page = 1
        return {
          kind: "ok",
          data,
        }
      }
    }),

    loadMoreRecords: flow(function* loadMoreRecords() {
      if (self.total < self.records.length) {
        return { kind: "end" }
      }

      const loanApi = new LoanApi(self.environment.api)
      const nextPage = self.page + 1
      self.page = nextPage

      const param = {
        page: nextPage,
        filter: { ...filter, skip: self.limit * (self.page - 1) },
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
      self.recordDetail = {}
    }),

    getProducts: flow(function* getProducts() {
      const loanApi = new LoanApi(self.environment.api)
      const param = {
        page: 1,
        filter: { ...filterProduct },
      }
      const result = yield loanApi.getProducts(param)
      if (result.kind !== "ok") {
        return result
      }
      const data = result.data.data ?? []
      if (data) {
        self.total = result.data.total
        self.products = data
        self.page = 1
        return {
          kind: "ok",
          data,
        }
      }
    }),

    loadMoreProducts: flow(function* loadMoreProducts() {
      if (self.total < self.products.length) {
        return { kind: "end" }
      }
      const loanApi = new LoanApi(self.environment.api)
      self.page = self.page + 1

      const param = {
        page: self.page,
        filter: { ...filterProduct, skip: self.limit * (self.page - 1) },
      }

      const result = yield loanApi.loadMoreProducts(param)
      if (result.kind !== "ok") {
        return result
      }

      const data = result?.data?.data ?? []
      const oldData: any = [...self.products]
      if (result) {
        const newData: any = oldData.concat(data)
        console.log("newData", newData)
        self.page += 1
        self.products = newData
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getProductDetail: flow(function* getProductDetail(id: string) {
      self.productDetail = {}

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

    createLoan: flow(function* createLoan(body) {
      const api = new BaseApi(self.environment.api)

      const result = yield api.post(`deals/create-deal-for-client`, body)
      const data = result.data

      if (result.kind !== "ok") {
        return result
      }

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
export interface LoanStore extends LoanStoreType {}
type LoanStoreSnapshotType = SnapshotOut<typeof LoanStoreModel>
export interface LoanStoreSnapshot extends LoanStoreSnapshotType {}
export const createLoanStoreDefaultModel = () => types.optional(LoanStoreModel, {})
