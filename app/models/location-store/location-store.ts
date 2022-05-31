import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { LocationApi } from "../../services/api/location-api"

/**
 * Model description here for TypeScript hints.
 */
export const LocationStoreModel = types
  .model("LocationStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    get: flow(function* get(type?: string, code?: string,parentId?: string, search?: string) {
      let params: any = {
        filter: {
          where: {
            _q: search,
            type: type,
            parentId: parentId,
          },
          limit:  100,
        }
      }
      if (code) {
        params = {
          filter: {
            where: {
              _q: search,
              type: type,
              "info.code": {
                inq: [code]
              }
            }
          }
        }
      }
      const api = new LocationApi(self.environment.api)
      const result = yield api.get(params)
      const data = result?.data


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

type LocationStoreType = Instance<typeof LocationStoreModel>
export interface LocationStore extends LocationStoreType { }
type LocationStoreSnapshotType = SnapshotOut<typeof LocationStoreModel>
export interface LocationStoreSnapshot extends LocationStoreSnapshotType { }
export const createLocationStoreDefaultModel = () => types.optional(LocationStoreModel, {})
