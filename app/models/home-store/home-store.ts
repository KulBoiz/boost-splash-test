import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { BaseApi } from "../../services/api/base-api"

/**
 * Model description here for TypeScript hints.
 */
export const HomeStoreModel = types
  .model("HomeStore")
  .extend(withEnvironment)
  .props({
    dataHome: types.optional(types.frozen(), []),
    vehicle: types.optional(types.frozen(), []),
    real_estate: types.optional(types.frozen(), []),
    projectHouse: types.optional(types.frozen(), []),

  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  }))
  .actions((self) => ({
    getVehicle: flow(function* getVehicle() {
      const result = yield self.api.get('product-details/public/home-app')
      const data = result?.data
      if (result.kind === "ok") {
        self.vehicle = data.vehicle
        self.real_estate = data.real_estate
        return data
      } else {
        self.vehicle = []
        self.real_estate = []
      }
    }),

    getViewHome: flow(function* getViewHome() {
      const result = yield self.api.get('product-details/public/view-home-app')
      const data = result?.data
      
      if (result.kind === "ok") {
        self.dataHome = data
        return data
      }
    }),

    getProjectHouse: flow(function* getProjectHouse(params) {
      const result = yield self.api.get('projects/public', params)
      const data = result?.data?.data
      if (result.kind === "ok") {
        self.projectHouse = data
        return data
      } else {
        return result
      }
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getHomeData: flow(function* getHomeData() {
      self.getVehicle()
      self.getViewHome()
      // self.getProjectHouse()
    })
  }))


type HomeStoreType = Instance<typeof HomeStoreModel>
export interface HomeStore extends HomeStoreType {}
type HomeStoreSnapshotType = SnapshotOut<typeof HomeStoreModel>
export interface HomeStoreSnapshot extends HomeStoreSnapshotType {}
export const createHomeStoreDefaultModel = () => types.optional(HomeStoreModel, {})
