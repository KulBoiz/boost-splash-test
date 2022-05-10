import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { AuthStoreModel } from "../auth-store"
import { NotificationStoreModel } from "../notification-store/notification-store"
import { LoanStoreModel } from "../loan-store/loan-store"
import { BannerStoreModel } from "../banner-store/banner-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  authStoreModel: types.optional(AuthStoreModel, {} as any),
  notificationModel: types.optional(NotificationStoreModel, {} as any),
  loanStore: types.optional(LoanStoreModel, {} as any),
  bannerStore: types.optional(BannerStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {
  authStoreModel: any
}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
