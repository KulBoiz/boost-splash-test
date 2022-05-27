import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BankApi } from "../../services/api/bank-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
const filter = {
  where: {
    orgId: '60e0533b8cf80a69dda333dc',
    type: 'bank'
  },
  include: [
    { relation: 'children' },
  ]
}

export const BankStoreModel = types
  .model("BankStore")
  .extend(withEnvironment)
  .props({
    total: types.optional(types.number, 0),
    page: types.optional(types.number, 1),
    banks: types.frozen([]),
    bankBranches: types.frozen([]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getBankList: flow(function* getBankList() {
      self.banks = [];

      const loanApi = new BankApi(self.environment.api)
      const param = {
        page: 1,
        "filter": filter
      }
      const result = yield loanApi.getBankList(param)
      if (result.kind !== "ok") {
        return result
      }
      const data = result?.data?.data
      if (data) {
        self.banks = data
        return {
          kind: "ok",
          data,
        }
      }
    }),

    loadMoreBankList: flow(function* loadMoreBankList() {
      const loanApi = new BankApi(self.environment.api)
      const nextPage = self.page + 1
      self.page = nextPage

      const param = {
        page: nextPage,
        "filter": filter
      }

      const result = yield loanApi.loadMoreBankList(param)
      if (result.kind !== "ok") {
        return result
      }
      const data = result?.data?.data
      const oldData: any = [...self.banks]
      if (data) {
        const newData: any = oldData.concat(data)
        self.page += 1
        self.banks = newData
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getBankBranch: flow(function* getBankBranch(parentId: string) {
      self.bankBranches = []
      
      const loanApi = new BankApi(self.environment.api)
      const param = {
        "filter": {
          where: {
            parentOrgId: parentId,
          },
          include: [
            { relation: 'children' },
          ]
        }
      }
      const result = yield loanApi.getBankBranch(param)
      if (result.kind !== "ok") {
        return result
      }

      const data = result?.data?.data

      if (data) {
        self.bankBranches = data
        return {
          kind: "ok",
          data,
        }
      }
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BankStoreType = Instance<typeof BankStoreModel>
export interface BankStore extends BankStoreType { }
type BankStoreSnapshotType = SnapshotOut<typeof BankStoreModel>
export interface BankStoreSnapshot extends BankStoreSnapshotType { }
export const createBankStoreDefaultModel = () => types.optional(BankStoreModel, {})
