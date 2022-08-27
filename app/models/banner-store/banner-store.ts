import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { BannerApi } from "../../services/api/banner-api"
import { BaseApi } from "../../services/api/base-api"

/**
 * Model description here for TypeScript hints.
 */
export const BannerStoreModel = types
  .model("BannerStore")
  .extend(withEnvironment)
  .props({
    publicBanners: types.frozen([]),
    publicNews: types.frozen([]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getPublicBanners: flow(function* getPublicBanners() {
      const api = new BaseApi(self.environment.api)
      const path = 'banners/public'

      const param ={
        page: 1,
        filter: {
          limit: 20,
          order: ['priority asc'],
        }
      }

      const result = yield api.get(path, param )
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

    getPublicBannerDetail: flow(function* getPublicBannerDetail(id: string) {
      const api = new BaseApi(self.environment.api)
      const path = `news/public/by-slug/${id}`
      const result = yield api.get(path)
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

    getPublicNews: flow(function* getPublicNews() {
      const api = new BaseApi(self.environment.api)
      const path = `news/public`
      const params = {
        page: 1,
        filter: {
          limit: 20,
          where: {
            oldIdDXG: {
              $not: { $type: "int" }
            }
          }
        }
      }

      const result = yield api.get(path, params)
      const data = result?.data?.data
      if (result.kind !== "ok") {
        return result
      }
      if (data) {
        self.publicNews = data
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
