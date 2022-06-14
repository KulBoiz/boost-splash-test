import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { CommentApi } from "../../services/api/comment-api"
import { TransactionApi } from "../../services/api/transaction-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const DealDetailStoreModel = types
  .model("DealDetailStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    dealDetailId: types.frozen(''),
    transaction: types.frozen([]),
    comments: types.frozen([]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDealDetailId: (dealDetailId: string) => {
      self.dealDetailId = dealDetailId;
    },
    
    getTransaction: flow(function* getTransaction(dealId: string, dealDetailId: string) {
      self.transaction = []
      self.comments = []
      
      const transactionApi = new TransactionApi(self.environment.api)
      const commentApi = new CommentApi(self.environment.api)
      
      const resultComment = yield commentApi.requestComment(dealDetailId)
      self.comments = resultComment?.data?.data

      const result = yield transactionApi.getTransaction(dealId, dealDetailId)
      
      if (result.kind !== "ok") {
        return result
      }

      const data = result?.data?.data
      if (data) {
        self.transaction = data
        return {
          kind: "ok",
          data,
        }
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type DealDetailStoreType = Instance<typeof DealDetailStoreModel>
export interface DealDetailStore extends DealDetailStoreType {}
type DealDetailStoreSnapshotType = SnapshotOut<typeof DealDetailStoreModel>
export interface DealDetailStoreSnapshot extends DealDetailStoreSnapshotType {}
export const createDealDetailStoreDefaultModel = () => types.optional(DealDetailStoreModel, {})
