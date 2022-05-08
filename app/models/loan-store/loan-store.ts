import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

import { LoanApi } from "../../services/api/loan-api"
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
    limit: types.optional(types.number, 10),
    page: types.optional(types.number, 1),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({

    requestCounselling: flow(function* requestCounselling(customerName: string, email: string, phone: string) {
      const loanApi = new LoanApi(self.environment.api)
      const userId = new LoanApi(self?.rootStore?.authStoreModel.userId)
      const result = yield loanApi.requestCounselling(userId.api, customerName, email, phone)
      const data = result.data

      if (result.kind !== "ok") {
        return result
      }
      
      if (data) {
        return  {
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
      const total = result?.data?.data?.total
      console.log('getRecords', result.data?.data);
      
      if (data) {
        self.records = data
        self.total=  total
        self.page = 1
        return  {
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
        const newData:any = oldData.concat(data)
        self.page += 1
        self.records = newData
        return  {
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
        return  {
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
          return  {
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
