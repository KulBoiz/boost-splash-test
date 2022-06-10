import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */

const path = 'comments'

export const CommentStoreModel = types
  .model("CommentStore")
  .props({
    comments: types.frozen([]),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    get: async (id) => {
      self.comments = []
      const api = new BaseApi(self.environment.api)
      const param = {
        filter: {
          limit: 20,
          order: ['createdAt asc'],
          where: {
            belongToId: id,
          }
        }
      }
      const result = await api.get(path, param)
      
      self.comments = result?.data?.data

      console.log('result?.data?.data', result?.data?.data);
      

      return result
    },

    post: async (body) => {
      const api = new BaseApi(self.environment.api)
      const result = await api.post(path, body)

      return result
    },
  }))

type CommentStoreType = Instance<typeof CommentStoreModel>
export interface CommentStore extends CommentStoreType { }
type CommentStoreSnapshotType = SnapshotOut<typeof CommentStoreModel>
export interface CommentStoreSnapshot extends CommentStoreSnapshotType { }
export const createCommentStoreDefaultModel = () => types.optional(CommentStoreModel, {})
