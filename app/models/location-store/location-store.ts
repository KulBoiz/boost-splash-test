import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const LocationStoreModel = types
  .model("LocationStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type LocationStoreType = Instance<typeof LocationStoreModel>
export interface LocationStore extends LocationStoreType {}
type LocationStoreSnapshotType = SnapshotOut<typeof LocationStoreModel>
export interface LocationStoreSnapshot extends LocationStoreSnapshotType {}
export const createLocationStoreDefaultModel = () => types.optional(LocationStoreModel, {})
