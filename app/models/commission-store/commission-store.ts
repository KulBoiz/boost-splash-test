import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { LoanApi } from "../../services/api/loan-api"

/**
 * Model description here for TypeScript hints.
 */

const include = [
  {
    relation: "user",
    scope: {
      fields: { id: true, fullName: true, firstName: true, lastName: true, emails: true, tels: true, orgId: true},
    }
  },
  {
    relation: "transaction",
    scope: {
      fields: { id: true, amount: true, code: true, status: true, partnerId: true, productId: true, createdAt: true, updatedAt: true},
    }
  },
  {
    relation: "transactionDetail",
    scope: {
      fields: { id: true, amount: true, code: true, status: true, createdAt: true, updatedAt: true},
    }
  },
]

const fields = [ 'id', 'amount', 'code', 'status', 'userId', 'transactionId', 'transactionDetailId', 'createdAt']

export const CommissionStoreModel = types
  .model("CommissionStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    // commission: types.optional(types.frozen(), {}),
    limit: types.optional(types.number, 20),
    totalLoan: types.optional(types.number, 0),
    totalInsurance: types.optional(types.number, 0),
    amount: types.optional(types.number, 0),
    page: types.optional(types.number, 1)
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
    userId() {
      return self?.rootStore?.authStoreModel.userId
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getChartData: flow(function* getChartData(totalYear?: number, totalMonth?: number) {
      const userId = self.userId()
      const result = yield self.api.get("commissions/by-state", {
        filter: {
          where: {
            totalYear,
            totalMonth,
            userId,
            type: 'spend'
          },
          fields
        },
      })
      const data = result?.data

      if (result.kind === "ok") {
        // self.commission = data
        return data
      }
    }),

    getCommission: flow(function* getCommission(transactionType?: string) {
      self.page = 1
      const userId = self.userId()
      const result = yield self.api.get("commissions", {
        filter: {
          limit: 20,
          skip: 0,
          where: {
            type: "spend",
            userId,
            transactionType,
            searchScope: 'myCommission'
          },
          include: include,
          fields
        },
      })
      const data = result?.data

      if (result.kind === "ok") {
        // self.commission = data
        return data
      }
    }),

    loadMoreCommission: flow(function* loadMoreCommission(transactionType?: string) {
      const userId = self.userId()
      self.page = self.page + 1

      const result = yield self.api.get("commissions", {
        page: self.page,
        filter: {
          limit: 20,
          skip: self.limit * (self.page - 1),
          where: {
            type: "spend",
            userId,
            transactionType,
            searchScope: 'myCommission'
          },
          include: include,
          fields
        },
      })

      if (result.kind !== "ok") {
        return result
      }

      const data = result?.data?.data ?? []
      if (result) {
        return {
          kind: "ok",
          data,
        }
      }
    }),

    getCommissionAmount: flow(function* getCommissionAmount() {
      self.amount = 0
      const userId = self.userId()
      const result = yield self.api.get("commissions", {
        filter: {
          where: {
            type: "spend",
            userId,
          },
        },
      })
      const data = result?.data
      if (result.kind === "ok") {
        self.amount = data?.metadata?.totalForControl ?? 0
        return data
      }
    }),

    getCommissionDetail: flow(function* getCommissionDetail(commissionId) {
      const result = yield self.api.get(`commissions/${commissionId}`, {
        filter: {
          include: [
            {
              relation: "user", scope: {
                include: [{ relation: "org" }],
                fields: include?.[0]?.scope?.fields
              },
            },
            {
              relation: "transaction", scope: {
                include: [
                  { relation: "partner" },
                  {
                    relation: "product",
                    scope: {
                      fields: ['id', 'name', 'code']
                    }
                  },
                ],
                fields: include?.[1]?.scope?.fields
              },
            },
            {
              relation: "transactionDetail",
              scope: {
                fields: include?.[1]?.scope?.fields
              }
            },
          ],
        },
      })
      const data = result?.data

      if (result.kind === "ok") {
        return data
      }
    }),
  }))
  .actions((self) => ({}))

type CommissionStoreType = Instance<typeof CommissionStoreModel>

export interface CommissionStore extends CommissionStoreType {
}

type CommissionStoreSnapshotType = SnapshotOut<typeof CommissionStoreModel>

export interface CommissionStoreSnapshot extends CommissionStoreSnapshotType {
}

export const createCommissionStoreDefaultModel = () => types.optional(CommissionStoreModel, {})
