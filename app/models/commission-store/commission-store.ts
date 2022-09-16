import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const CommissionStoreModel = types
  .model("CommissionStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    // commission: types.optional(types.frozen(), {}),
    amount: types.optional(types.number, 0)
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
    userId(){
      return self?.rootStore?.authStoreModel.userId
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({

    getCommission: flow(function* getCommission(transactionType?: string) {
      const userId = self.userId()
      const result = yield self.api.get("commissions", {
        filter: {
          limit: 20,
          skip: 0,
          where: {
            type: "spend",
            userId,
            transactionType,
          },
          include: [
            { relation: "user" },
            { relation: "transaction" },
            { relation: "transactionDetail" },
          ],
        },
      })
      const data = result?.data

      if (result.kind === "ok") {
        // self.commission = data
        return data
      }
    }),

    getCommissionAmount: flow(function* getCommissionAmount() {
      self.amount = 0
      const userId = self.userId()
      const result = yield self.api.get("commissions", {
        filter: {
          where: {
            type: "spend",
            userId,
          },
        },
      })
      const data = result?.data
      if (result.kind === "ok") {
        self.amount = data?.metadata?.totalForControl ?? 0
        return data
      }
    }),

    getCommissionDetail: flow(function* getCommissionDetail(commissionId) {
      const result = yield self.api.get(`commissions/${commissionId}`, {
        filter: {
          include: [
            {
              relation: "user", scope: {
                include: [{ relation: "org" }],
              },
            },
            {
              relation: "transaction", scope: {
                include: [
                  { relation: "partner" },
                  { relation: "product" },
                ],
              },
            },
            { relation: "transactionDetail" },
          ],
        },
      })
      const data = result?.data

      if (result.kind === "ok") {
        return data
      }
    }),
  }))
  .actions((self) => ({}))

type CommissionStoreType = Instance<typeof CommissionStoreModel>

export interface CommissionStore extends CommissionStoreType {
}

type CommissionStoreSnapshotType = SnapshotOut<typeof CommissionStoreModel>

export interface CommissionStoreSnapshot extends CommissionStoreSnapshotType {
}

export const createCommissionStoreDefaultModel = () => types.optional(CommissionStoreModel, {})
