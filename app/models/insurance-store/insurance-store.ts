import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const InsuranceStoreModel = types
  .model("InsuranceStore")
  .props({
    isFirstTime: types.optional(types.boolean, true),

  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setIsFirstTime: flow(function* isFirstTime() {
      self.isFirstTime = false
      return self.isFirstTime
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type InsuranceStoreType = Instance<typeof InsuranceStoreModel>
export interface InsuranceStore extends InsuranceStoreType {}
type InsuranceStoreSnapshotType = SnapshotOut<typeof InsuranceStoreModel>
export interface InsuranceStoreSnapshot extends InsuranceStoreSnapshotType {}
export const createInsuranceStoreDefaultModel = () => types.optional(InsuranceStoreModel, {})
