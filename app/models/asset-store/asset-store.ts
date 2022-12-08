import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { BaseApi } from "../../services/api/base-api"
import { INVEST_TRANSACTION_TYPE } from "../../constants/types"

/**
 * Model description here for TypeScript hints.
 */
const PagingParamsModel = types.optional(
  types.model({
    page: 1,
    limit: 20,
  }),
  {},
)

export type PagingParamsType = Instance<typeof PagingParamsModel>

export const AssetStoreModel = types
  .model("AssetStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    loading: types.optional(types.boolean, false),
    pagingRequest: PagingParamsModel,
    otpTransId: types.optional(types.string, ""),
    assetAmount: types.frozen([]),
    sellTransactionInfo: types.frozen({}),
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
    userId() {
      return self?.rootStore?.authStoreModel.userId
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getUserAsset: flow(function* getUserAsset() {
      const result = yield self.api.get("users/asset-management-product", {})
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
      return result
    }),

    getTransactionHistory: flow(function* getTransactionHistory(type: INVEST_TRANSACTION_TYPE, pagingParams?: PagingParamsType) {
      const _pagingParams: any = {
        ...self.pagingRequest,
        ...pagingParams,
      }
      const result = yield self.api.get("users/transactions", {
        filter: {
          where: {
            type,
          },
          limit: pagingParams?.limit,
          skip: (pagingParams?.page - 1) * pagingParams?.limit,
        },
        page: pagingParams?.page,
      })
      const data = result?.data
      if (result.kind === "ok") {
        self.pagingRequest = _pagingParams
        return data
      }
      return result
    }),

    getFiveTransactionHistory: flow(function* getFiveTransactionHistory(productId) {
      const result = yield self.api.get("users/transactions", {
        filter: {
          where: {
            type: INVEST_TRANSACTION_TYPE.BUY,
            productId,
          },
          limit: 5,
          skip: 0,
        },
        page: 1,
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
      return result
    }),

    loadAssetProgram: flow(function* loadAssetProgram(productId) {
      self.assetAmount = []
      const result = yield self.api.get("products/load-asset-program", {
        filter: {
          where: {
            productId,
          },
        },
      })
      const data = result?.data
      if (result.kind === "ok") {
        self.assetAmount = data
        return data
      }
      return result
    }),

    loadRedemptionFee: flow(function* loadRedemptionFee(param: { volume, productId, productProgramId }) {
      const result = yield self.api.post("products/load-redemption-fee-estimation-with-mio", param)
      if (result.kind === "ok") {
        return result?.data
      }
      return result
    }),

    createSellOrder: flow(function* createSellOrder(param: { volume, productId, productProgramId }) {
      self.otpTransId = ""
      const result = yield self.api.post("products/create-sell-order-with-mio", param)
      const data = result?.data
      if (result.kind === "ok") {
        self.otpTransId = data?.otpInfo?.otpTransId
        return data?.data
      }
      return result
    }),

    resendSellOrderOtp: flow(function* resendSellOrderOtp() {
      const result = yield self.api.post("products/resend-otp-sell-order-with-mio", { otpTransId: self.otpTransId })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
      return result
    }),

    verifySellOrderOtp: flow(function* verifySellOrderOtp(otp) {
      const result = yield self.api.post("products/verify-otp-sell-order-with-mio", {
        otp,
        otpTransId: self.otpTransId,
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
      return result
    }),

    setInfoSellTransaction: flow(function* setInfoSellTransaction(param) {
      self.sellTransactionInfo = param
    }),

    clearSellData: flow(function* clearSellData() {
      self.sellTransactionInfo = {}
      self.otpTransId = ""
      self.assetAmount = []
    }),


  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AssetStoreType = Instance<typeof AssetStoreModel>

export interface AssetStore extends AssetStoreType {
}

type AssetStoreSnapshotType = SnapshotOut<typeof AssetStoreModel>

export interface AssetStoreSnapshot extends AssetStoreSnapshotType {
}

export const createAssetStoreDefaultModel = () => types.optional(AssetStoreModel, {})
