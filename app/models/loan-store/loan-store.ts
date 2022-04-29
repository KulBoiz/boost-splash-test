import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const LoanStoreModel = types
  .model("LoanStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type LoanStoreType = Instance<typeof LoanStoreModel>
export interface LoanStore extends LoanStoreType {}
type LoanStoreSnapshotType = SnapshotOut<typeof LoanStoreModel>
export interface LoanStoreSnapshot extends LoanStoreSnapshotType {}
export const createLoanStoreDefaultModel = () => types.optional(LoanStoreModel, {})
