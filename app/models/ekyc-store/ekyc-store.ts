import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { BaseApi } from "../../services/api/base-api"

/**
 * Model description here for TypeScript hints.
 */
export const EkycStoreModel = types
  .model("EkycStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
    userId() {
      return self?.rootStore?.authStoreModel.userId
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getIdentityInfo: flow(function* getIdentityInfo(img) {
      const result = yield self.api.post("users/get-personal-info-upload", {
       img
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type EkycStoreType = Instance<typeof EkycStoreModel>
export interface EkycStore extends EkycStoreType {}
type EkycStoreSnapshotType = SnapshotOut<typeof EkycStoreModel>
export interface EkycStoreSnapshot extends EkycStoreSnapshotType {}
export const createEkycStoreDefaultModel = () => types.optional(EkycStoreModel, {})
