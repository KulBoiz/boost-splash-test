import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { CategoryApi } from "../../services/api/category-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const MenuFilterStoreModel = types
  .model("MenuFilterStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    categories: types.frozen([]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    get: flow(function* get(id: string) {
      const api = new CategoryApi(self.environment.api)

      const result = yield api.get()
      const data = result?.data?.data

      if (data) {
        self.categories = data?.map(el => ({icon: el?.icon?.url, title: el?.name, key: el?.id}))
      }

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

type MenuFilterStoreType = Instance<typeof MenuFilterStoreModel>
export interface MenuFilterStore extends MenuFilterStoreType {}
type MenuFilterStoreSnapshotType = SnapshotOut<typeof MenuFilterStoreModel>
export interface MenuFilterStoreSnapshot extends MenuFilterStoreSnapshotType {}
export const createMenuFilterStoreDefaultModel = () => types.optional(MenuFilterStoreModel, {})
