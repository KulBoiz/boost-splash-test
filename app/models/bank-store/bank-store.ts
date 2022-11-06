import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */

const pathStore =  "organizations"

export const BankStoreModel = types
  .model("BankStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    total: types.optional(types.number, 0),
    page: types.optional(types.number, 1),
    banks: types.frozen([]),
    bankBranches: types.frozen([]),
  })
  .views((self) => ({
    rootOrgId() {
      return self?.rootStore?.authStoreModel.user?.rootOrgId
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getBankList: flow(function* getBankList(search?: string) {
      self.banks = [];
      const rootOrgId = self.rootOrgId()

      const api = new BaseApi(self.environment.api)
      const param = {
        page: 1,
        filter: {
          where: {
            type: 'bank',
            _q: search || undefined,
            parentOrgId: rootOrgId
          },
          include: [
            { relation: 'children' },
          ]
        }
      }
      const result = yield api.get(`${pathStore}/public/suggestion`, param)
      if (result.kind !== "ok") {
        return result
      }
      const data = result?.data
      if (data) {
        self.banks = data
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getBankBranch: flow(function* getBankBranch(parentId: string, search?: string) {
      self.bankBranches = []

      const api = new BaseApi(self.environment.api)
      const param = {
        "filter": {
          where: {
            _q: search || undefined,
            parentOrgId: parentId,
          },
          include: [
            { relation: 'children' },
          ]
        }
      }
      const result = yield api.get(pathStore, param)
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
