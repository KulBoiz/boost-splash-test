import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi, BaseCallApi } from "../../services/api/base-api"
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
    get apiBase() {
      return new BaseCallApi(self.environment.api)
    },
  }))
  // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getQRBuyFund: flow(function* getQRBuyFund(data) {
      const result = yield self.api.post(`transactions/create-qr-transaction-buy-fund`, data)
      return result
    }),

    getBankAndroid: flow(function* getBankAndroid(data) {
      const result = yield self.apiBase.get(`https://api.vietqr.io/v2/android-app-deeplinks`)
      return result
    }),

    getBankIos: flow(function* getBankIos(data) {
      const result = yield self.apiBase.get(`https://api.vietqr.io/v2/ios-app-deeplinks`)
      return result
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type VietQrStoreType = Instance<typeof VietQrStoreModel>
export interface VietQrStore extends VietQrStoreType { }
type VietQrStoreSnapshotType = SnapshotOut<typeof VietQrStoreModel>
export interface VietQrStoreSnapshot extends VietQrStoreSnapshotType { }
export const createVietQrStoreDefaultModel = () => types.optional(VietQrStoreModel, {})
