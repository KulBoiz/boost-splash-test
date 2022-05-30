import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const AgentStoreModel = types
  .model("AgentStore")
  .extend(withEnvironment)
  .props({
    fullName: types.optional(types.string, ''),
    phone: types.optional(types.string, ''),
    bank: types.optional(types.string, ''),
    bankBranch: types.optional(types.string, ''),
    province: types.optional(types.string, ''),
    district: types.optional(types.string, ''),
    commune: types.optional(types.string, ''),
    address: types.optional(types.string, ''),
    sex: types.optional(types.string, ''),
    citizenIdentification     : types.optional(types.string, ''),
    dateRange: types.optional(types.string, ''),
    issuedBy: types.optional(types.string, ''),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AgentStoreType = Instance<typeof AgentStoreModel>
export interface AgentStore extends AgentStoreType {}
type AgentStoreSnapshotType = SnapshotOut<typeof AgentStoreModel>
export interface AgentStoreSnapshot extends AgentStoreSnapshotType {}
export const createAgentStoreDefaultModel = () => types.optional(AgentStoreModel, {})
