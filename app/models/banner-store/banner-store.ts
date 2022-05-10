import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { BannerApi } from "../../services/api/banner-api"

/**
 * Model description here for TypeScript hints.
 */
export const BannerStoreModel = types
  .model("BannerStore")
  .extend(withEnvironment)
  .props({
    publicBanners: types.frozen([]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getPublicBanners: flow(function* getPublicBanners() {
      const loanApi = new BannerApi(self.environment.api)
      const result = yield loanApi.getPublicBanners()
      const data = result.data
      if (result.kind !== "ok") {
        return result
      }
      if (data) {
        self.publicBanners = data
        return {
          kind: "ok",
          data,
        }
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BannerStoreType = Instance<typeof BannerStoreModel>
export interface BannerStore extends BannerStoreType {}
type BannerStoreSnapshotType = SnapshotOut<typeof BannerStoreModel>
export interface BannerStoreSnapshot extends BannerStoreSnapshotType {}
export const createBannerStoreDefaultModel = () => types.optional(BannerStoreModel, {})
