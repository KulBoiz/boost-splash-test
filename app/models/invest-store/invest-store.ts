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

export const InvestStoreModel = types
  .model("InvestStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    limit: 20,
    totalBonds: types.optional(types.number, 0),
    totalFund: types.optional(types.number, 0),
    pagingParamsBonds: PagingParamsModel,
    pagingParamsFund: PagingParamsModel,
    bondsDetail: types.frozen({}),
    buyInfo: types.frozen({}),
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

      const userId = self.userId()
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

      const userId = self.userId()
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
      const result = yield self.api.get(`products/public/by-slug/${slug}?filter=${JSON.stringify({ include: [{ relation: "org" }] })}`)
      const data = result?.data
      if (result.kind === "ok") {
        self.bondsDetail = data
        return data
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type InvestStoreType = Instance<typeof InvestStoreModel>

export interface InvestStore extends InvestStoreType {
}

type InvestStoreSnapshotType = SnapshotOut<typeof InvestStoreModel>

export interface InvestStoreSnapshot extends InvestStoreSnapshotType {
}

export const createInvestStoreDefaultModel = () => types.optional(InvestStoreModel, {})