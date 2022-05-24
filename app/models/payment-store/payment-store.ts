import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { PaymentApi } from "../../services/api/payment-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const PaymentStoreModel = types
  .model("PaymentStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    payment: types.frozen({}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    post: flow(function* post(body: any) {
      self.payment = {}

      const api = new PaymentApi(self.environment.api)
      const result = yield api.post(body)
      const data = result?.data
      self.payment = data

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

    confirmTransaction: flow(function* confirmTransaction(body: any) {
      self.payment = {}

      const api = new PaymentApi(self.environment.api)
      const result = yield api.confirmTransaction(body)
      const data = result?.data
      self.payment = data

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

type PaymentStoreType = Instance<typeof PaymentStoreModel>
export interface PaymentStore extends PaymentStoreType {}
type PaymentStoreSnapshotType = SnapshotOut<typeof PaymentStoreModel>
export interface PaymentStoreSnapshot extends PaymentStoreSnapshotType {}
export const createPaymentStoreDefaultModel = () => types.optional(PaymentStoreModel, {})
