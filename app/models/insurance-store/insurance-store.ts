import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const InsuranceStoreModel = types
  .model("InsuranceStore")
  .extend(withEnvironment)
  .props({
    isFirstTime: types.optional(types.boolean, true),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setIsFirstTime: flow(function* isFirstTime() {
      self.isFirstTime = false
      return self.isFirstTime
    }),
    buyInsurance: flow(function* buyInsurance(data) {
      const api = new BaseApi(self.environment.api)
      const result = yield api.post("/transactions/public/insurance-multiple", data)
      if (result.kind === "ok") {
        return result?.data?.data
      } else {
        return undefined
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type InsuranceStoreType = Instance<typeof InsuranceStoreModel>
export interface InsuranceStore extends InsuranceStoreType {}
type InsuranceStoreSnapshotType = SnapshotOut<typeof InsuranceStoreModel>
export interface InsuranceStoreSnapshot extends InsuranceStoreSnapshotType {}
export const createInsuranceStoreDefaultModel = () => types.optional(InsuranceStoreModel, {})
