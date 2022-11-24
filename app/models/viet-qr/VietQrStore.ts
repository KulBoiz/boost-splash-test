import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const VietQrStoreModel = types
  .model("VietQrStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({})
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  }))
  // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getQRBuyFund: flow(function* getQRBuyFund(data) {
      return yield self.api.post(`transactions/create-qr-transaction-buy-fund`, data)
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type VietQrStoreType = Instance<typeof VietQrStoreModel>
export interface VietQrStore extends VietQrStoreType {}
type VietQrStoreSnapshotType = SnapshotOut<typeof VietQrStoreModel>
export interface VietQrStoreSnapshot extends VietQrStoreSnapshotType {}
export const createVietQrStoreDefaultModel = () => types.optional(VietQrStoreModel, {})
