import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const CommissionStoreModel = types
  .model("CommissionStore")
  .extend(withEnvironment)
  .props({
    commission: types.optional(types.frozen(), {}),
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getCommission: flow(function* getCommission(userId, transactionType?: string) {
      const result = yield self.api.get('commissions', {
        filter: {
          limit: 20,
          skip: 0,
          where: {
            type: 'spend',
            userId,
            transactionType
          },
          include: [
            { relation: 'user' },
            { relation: 'transaction' },
            { relation: 'transactionDetail' },
          ]
        }
      })
      const data = result?.data
      
      if (result.kind === "ok") {
        self.commission = data
        return data
      }
    }),
  }))
  .actions((self) => ({

  }))

type CommissionStoreType = Instance<typeof CommissionStoreModel>
export interface CommissionStore extends CommissionStoreType {}
type CommissionStoreSnapshotType = SnapshotOut<typeof CommissionStoreModel>
export interface CommissionStoreSnapshot extends CommissionStoreSnapshotType {}
export const createCommissionStoreDefaultModel = () => types.optional(CommissionStoreModel, {})
