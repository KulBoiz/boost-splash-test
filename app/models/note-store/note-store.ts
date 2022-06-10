import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */

const path = 'comments'
 
export const NoteStoreModel = types
  .model("NoteStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    comments: types.frozen([]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
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

      return result
    },

    post: async (body) => {
      const api = new BaseApi(self.environment.api)
      const result = await api.post(path, body)

      return result
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NoteStoreType = Instance<typeof NoteStoreModel>
export interface NoteStore extends NoteStoreType {}
type NoteStoreSnapshotType = SnapshotOut<typeof NoteStoreModel>
export interface NoteStoreSnapshot extends NoteStoreSnapshotType {}
export const createNoteStoreDefaultModel = () => types.optional(NoteStoreModel, {})
