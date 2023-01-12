import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { BaseApi } from "../../services/api/base-api"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const BannerStoreModel = types
  .model("BannerStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    pagingRequest: types.optional(types.number, 1),
    totalNews: types.optional(types.number, 0),
    publicBanners: types.frozen([]),
    publicNews: types.frozen([]),
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getPublicBannerDetail: flow(function* getPublicBannerDetail(id: string) {
      const api = new BaseApi(self.environment.api)
      const path = `news/public/by-slug/${id}`
      const result = yield api.get(path, {
        filter: {
          include: [
            {
              relation: 'category',
              scope: {
                fields: { id: true, name: true }
              }
            },
          ]
        }
      })

      const resultHashtag = yield api.get('hashtags/public/suggestion', {
        filter: {
          fields: ['id', 'name'],
          where: {
            id: {
              inq: result?.data?.hashtagIds || []
            }
          }
        }
      })

      const data = result.data

      if (result.kind !== "ok") {
        return result
      }

      if (data) {
        self.publicBanners = data
        return {
          kind: "ok",
          data,
          resultHashtag
        }
      }
    }),

    getPublicNews: flow(function* getPublicNews() {
      const api = new BaseApi(self.environment.api)
      const path = `news/public`
      const params = {
        page: 1,
        filter: {
          limit: 10,
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

    getNewsByCategory: flow(function* getNewsByCategory(
      categoryId: string,
      pagingParams: number,
    ) {
      const params = {
        page: pagingParams,
        filter: {
          limit: 20,
          skip: (pagingParams - 1) * 20,
          where: {
            oldIdDXG: {
              $not: { $type: "int" }
            },
            categoryId,
            isActive: true
          }
        }
      }
      const result = yield self.api.get("news/public", params)
      const data = result?.data?.data
      if (result.kind === "ok") {
        self.pagingRequest = pagingParams
        self.totalNews = result?.data?.total
        return data
      }
    }),

    getRandomNews: flow(function* getRandomNews() {
      const params = {
        request: {
          numberOutstanding: 8,
          numberNew: 7
        }
      }
      const result = yield self.api.get("news/news-random", params)
      const data = result?.data?.data
      if (result.kind === "ok") {
        return data
      }
    }),

    getFilterNews: flow(function* getFilterNews() {
      const params = {
        page: 1,
        filter: {
          skip:0,
          limit: 100,
          where: {
            type: 'news'
          }
        }
      }
      const result = yield self.api.get("categories/public", params)
      const data = result?.data?.data
      if (result.kind === "ok") {
        return data
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BannerStoreType = Instance<typeof BannerStoreModel>
export interface BannerStore extends BannerStoreType {}
type BannerStoreSnapshotType = SnapshotOut<typeof BannerStoreModel>
export interface BannerStoreSnapshot extends BannerStoreSnapshotType {}
export const createBannerStoreDefaultModel = () => types.optional(BannerStoreModel, {})
