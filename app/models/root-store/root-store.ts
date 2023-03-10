import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AppStoreModel } from "../app-store"
import { AuthStoreModel } from "../auth-store"
import { NotificationStoreModel } from "../notification-store/notification-store"
import { LoanStoreModel } from "../loan-store/loan-store"
import { BannerStoreModel } from "../banner-store/banner-store"
import { DealDetailStoreModel } from "../deal-detail-store/deal-detail-store"
import { InsuranceStoreModel } from "../insurance-store/insurance-store"
import { MenuFilterStoreModel } from "../menu-filter-store/menu-filter-store"
import { ProductStoreModel } from "../product-store/product-store"
import { PaymentStoreModel } from "../payment-store/payment-store"
import { BankStoreModel } from "../bank-store/bank-store"
import { LocationStoreModel } from "../location-store/location-store"
import { MediaStoreModel } from "../media-store/media-store"
import { AgentStoreModel } from "../agent-store/agent-store"
import { BankerStoreModel } from "../banker-store/banker-store"
import { CommentStoreModel } from "../comment-store/comment-store"
import { NoteStoreModel } from "../note-store/note-store"
import { UploadStoreModel } from "../upload-store/upload-store"
import { HomeStoreModel } from "../home-store/home-store"
import { CommissionStoreModel } from "../commission-store/commission-store"
import { InvestStoreModel } from "../invest-store/invest-store"
import { EkycStoreModel } from "../ekyc-store/ekyc-store"
import { AssetStoreModel } from "../asset-store/asset-store"
import { VietQrStoreModel } from "../viet-qr/VietQrStore"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  appStore: types.optional(AppStoreModel, {} as any),
  authStoreModel: types.optional(AuthStoreModel, {} as any),
  notificationModel: types.optional(NotificationStoreModel, {} as any),
  loanStore: types.optional(LoanStoreModel, {} as any),
  bannerStore: types.optional(BannerStoreModel, {} as any),
  dealDetailStoreModel: types.optional(DealDetailStoreModel, {} as any),
  insuranceStore: types.optional(InsuranceStoreModel, {} as any),
  menuFilterStore: types.optional(MenuFilterStoreModel, {} as any),
  productStore: types.optional(ProductStoreModel, {} as any),
  paymentStore: types.optional(PaymentStoreModel, {} as any),
  mediaStore: types.optional(MediaStoreModel, {} as any),
  bankStore: types.optional(BankStoreModel, {} as any),
  locationStore: types.optional(LocationStoreModel, {} as any),
  agentStore: types.optional(AgentStoreModel, {} as any),
  bankerStore: types.optional(BankerStoreModel, {} as any),
  commentStore: types.optional(CommentStoreModel, {} as any),
  noteStore: types.optional(NoteStoreModel, {} as any),
  uploadStore: types.optional(UploadStoreModel, {} as any),
  homeStore: types.optional(HomeStoreModel, {} as any),
  commissionStore: types.optional(CommissionStoreModel, {} as any),
  investStore: types.optional(InvestStoreModel, {} as any),
  ekycStore: types.optional(EkycStoreModel, {} as any),
  assetStore: types.optional(AssetStoreModel, {} as any),
  vietQrStore: types.optional(VietQrStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
// @ts-ignore
export interface RootStore extends Instance<typeof RootStoreModel> {
  appStore: any
  authStoreModel: any
  notificationModel: any
  loanStore: any
  bannerStore: any
  dealDetailStoreModel: any
  insuranceStore: any
  menuFilterStore: any
  productStore: any
  paymentStore: any
  mediaStore: any
  bankStore: any
  locationStore: any
  agentStore: any
  bankerStore: any
  commentStore: any
  noteStore: any
  uploadStore: any
  homeStore: any
  commissionStore: any
  investStore: any
  ekycStore: any
  assetStore: any
  vietQrStore: any
}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {
}
