import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { UploadApi } from "../../services/api/upload-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const UploadStoreModel = types
  .model("UploadStore")
  .extend(withEnvironment)
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    uploadImage: flow(function* uploadImage(
      body,
    ) {
      const uploadApi = new UploadApi(self.environment.api)
      const result = yield uploadApi.uploadFile(body)
      const data = result.data

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

type UploadStoreType = Instance<typeof UploadStoreModel>
export interface UploadStore extends UploadStoreType {}
type UploadStoreSnapshotType = SnapshotOut<typeof UploadStoreModel>
export interface UploadStoreSnapshot extends UploadStoreSnapshotType {}
export const createUploadStoreDefaultModel = () => types.optional(UploadStoreModel, {})
