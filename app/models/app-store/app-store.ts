import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { find } from "../../utils/lodash-utils"

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model("AppStore")
  .extend(withEnvironment)
  .props({
    filesDownloaded: types.optional(types.frozen(), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addFileDownloaded: flow(function* addFileDownloaded(filePath) {
      const files: any = self.filesDownloaded
      const fileExists = find(files, (f) => f === filePath)
      if (!fileExists) {
        self.filesDownloaded = files.concat([filePath])
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type AppStoreType = Instance<typeof AppStoreModel>

export interface AppStore extends AppStoreType {}

type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>

export interface AppStoreSnapshot extends AppStoreSnapshotType {}
