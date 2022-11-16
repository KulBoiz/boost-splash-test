import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { BaseApi } from "../../services/api/base-api"

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
type PagingParamsType = Instance<typeof PagingParamsModel>
const filterFundDetail = {
  include: [
    {relation: 'org', scope: {fields: {id: true, name: true, description: true, image: true, backgroundColor: true}}},
    {relation: 'productDetails', scope: {include: [{relation: 'fees'}]}}
  ]
}
export const InvestStoreModel = types
  .model("InvestStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    limit: 20,
    phone: types.optional(types.string, ''),
    transactionId: types.optional(types.string, ''),
    transactionInfo: types.frozen({}),
    totalBonds: types.optional(types.number, 0),
    totalFund: types.optional(types.number, 0),
    pagingParamsBonds: PagingParamsModel,
    pagingParamsFund: PagingParamsModel,
    bondsDetail: types.frozen({}),
    buyInfo: types.frozen({}),
    estimatedQuantity: types.optional(types.string, ''),
    nav: types.optional(types.string, ''),
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
    userId() {
      return self?.rootStore?.authStoreModel.userId
    },
  }))
  .actions((self) => ({
    setBuyInfo: (info: any) => {
      self.buyInfo = info
    },

    getCurrentNav: flow(function* getCurrentNav(productId) {
      const result = yield self.api.get("navs/public", {
        filter: {
          where: {
            productId
          },
          limit: 1,
          skip: 0,
          order: ['navDate DESC'],
        },
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
    }),

    getNavs: flow(function* getNavs(productId) {
      const result = yield self.api.get("navs/public", {
        filter: {
          where: {
            productId
          },
          order: ['navDate DESC'],
        },
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
    }),


    getOutstandingBonds: flow(function* getOutstandingBonds() {
      const result = yield self.api.get("products/public-bond", {
        filter: {
          where: {
            type: "bonds",
            isOutstanding: true,
          },
          include: [
            { relation: "org" },
          ],
          limit: 10,
          skip: 0,
        },
        page: 1,
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
    }),

    getOutstandingFund: flow(function* getOutstandingFund() {
      const result = yield self.api.get("products/public-fund", {
        filter: {
          where: {
            isOutstanding: true,
          },
          include: [
            { relation: "org" },
          ],
          limit: 10,
          skip: 0,
        },
        page: 1,
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data?.data
      }
    }),

    getBonds: flow(function* getBonds(
      params?: any,
      pagingParams?: PagingParamsType,
    ) {

      const _pagingParams: any = {
        ...self.pagingParamsBonds,
        ...pagingParams,
      }
      const result = yield self.api.get("products/public-bond", {
        page: pagingParams?.page,
        filter: {
          limit: self?.limit,
          skip: (pagingParams?.page - 1) * self?.limit,
          include: [
            { relation: "org" },
            { relation: "category" },
          ],
          where: {
            _q: params?.search,
          },
        },
      })

      const data = result?.data
      if (result.kind === "ok") {
        self.pagingParamsBonds = _pagingParams
        self.totalBonds = data?.total ?? 0
        return data?.data
      }
    }),

    getFund: flow(function* getFund(
      params?: any,
      pagingParams?: PagingParamsType,
    ) {

      const _pagingParams: any = {
        ...self.pagingParamsFund,
        ...pagingParams,
      }

      const result = yield self.api.get("products/public-fund", {
        page: pagingParams?.page,
        filter: {
          limit: self?.limit,
          skip: (pagingParams?.page - 1) * self?.limit,
          include: [
            { relation: "org" },
          ],
          where: {
            _q: params?.search,
          },
        },
      })

      const data = result?.data
      if (result.kind === "ok") {
        self.pagingParamsFund = _pagingParams
        self.totalFund = data?.total ?? 0
        return data?.data
      }
    }),

    getBondsDetail: flow(function* getBondsDetail(slug: string) {
      self.bondsDetail = {}
      const result = yield self.api.get(`products/public/by-slug/${slug}`, {
        filter: {
          include: [
            { relation: "org" },
            { relation: "category" },
          ],
        },
      })
      const data = result?.data
      if (result.kind === "ok") {
        self.bondsDetail = data
        return data
      }
    }),

    getFundDetail: flow(function* getFundDetail(slug: string) {
      self.bondsDetail = {}
      const result = yield self.api.get(`products/public/by-slug/${slug}?filter=${JSON.stringify(filterFundDetail)}`)
      const data = result?.data
      if (result.kind === "ok") {
        self.bondsDetail = data
        return data
      }
    }),

    createBuyFundTransaction: flow(function* createBuyFundTransaction(param: any, estimatedQuantity: string, nav: string) {
      const result = yield self.api.post(`transactions/create-transaction-buy-fund`, param)
      const data = result?.data
      self.transactionId = data?.id
      self.estimatedQuantity = estimatedQuantity
      self.nav = nav
      if (result.kind === "ok") {
        return data
      }
      return result
    }),

    sendOtpBuyFund: flow(function* sendOtpBuyFund() {
      const result = yield self.api.post(`transactions-partner-logs/send-otp-buy-fund`, {
        phone: self.phone, transactionId: self.transactionId
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
      return result
    }),

    resendOtpBuyFund: flow(function* resendOtpBuyFund() {
      const result = yield self.api.post(`transactions-partner-logs/resend-otp-buy-fund`, {
        phone: self.phone, transactionId: self.transactionId
      })
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
    }),

    verifyOtpBuyFund: flow(function* verifyOtpBuyFund(otpCode) {
      self.transactionInfo = {}
      const userId = self.userId()
      const result = yield self.api.post(`transactions-partner-logs/${userId}/verify-otp-buy-fund`, {
        transactionId: self.transactionId, otpCode, otp: otpCode
      })
      const data = result?.data
      self.transactionInfo = data

      if (result.kind === "ok") {
        return data
      }
      return result
    }),

    getKycPhone: flow(function* getKycPhone() {
      const userId = self.userId()
      const result = yield self.api.get(`kycs`, {
        filter: {
          where: {
            userId
          }
        }
      })
      const data = result?.data
      if (result.kind === "ok") {
        self.phone = data?.data?.[0]?.mioInfo?.phone
      }
      return result
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type InvestStoreType = Instance<typeof InvestStoreModel>

export interface InvestStore extends InvestStoreType {
}

type InvestStoreSnapshotType = SnapshotOut<typeof InvestStoreModel>

export interface InvestStoreSnapshot extends InvestStoreSnapshotType {
}

export const createInvestStoreDefaultModel = () => types.optional(InvestStoreModel, {})
