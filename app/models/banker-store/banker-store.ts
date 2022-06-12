import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { unionBy } from "../../utils/lodash-utils"
import { withEnvironment } from "../extensions/with-environment"

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

export const BankerStoreModel = types
  .model("BankerStore")
  .extend(withEnvironment)
  .props({
    isRefreshingListRequest: false,
    isLoadingMoreListRequest: false,
    pagingParamsListRequest: PagingParamsModel,
    listRequestTotal: 0,
    listRequest: types.optional(types.frozen(), []),
    isRefreshingListLoan: false,
    isLoadingMoreListLoan: false,
    pagingParamsListLoan: PagingParamsModel,
    listLoanTotal: 0,
    listLoan: types.optional(types.frozen(), []),
    documentTemplates: types.optional(types.frozen(), []),
    documentTemplateFiles: types.optional(types.frozen(), []),
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getListRequest: flow(function* getListRequest(
      params?: any,
      pagingParams?: PagingParamsType,
      isRefresh = false,
    ) {
      if (isRefresh) {
        self.isRefreshingListRequest = true
      } else {
        self.isLoadingMoreListRequest = true
      }
      const _pagingParams: any = {
        ...self.pagingParamsListRequest,
        ...pagingParams,
      }
      const result = yield self.api.get("survey-results/search-for-teller", {
        filter: {
          order: ["sharedAt asc"],
          skip: 0,
          include: [
            {
              relation: "task",
              scope: {
                include: [{ relation: "bankFeedbacks" }],
              },
            },
          ],
          where: {
            _q: params?.search,
            status: "deal_processing_task",
          },
        },
        limit: pagingParams?.limit,
        page: pagingParams?.page,
      })
      self.isRefreshingListRequest = false
      self.isLoadingMoreListRequest = false
      if (result.kind === "ok") {
        const data = result?.data?.data
        self.pagingParamsListRequest = _pagingParams
        self.listRequestTotal = result?.data?.total
        if (isRefresh || pagingParams?.page === 1) {
          self.listRequest = data
        } else {
          self.listRequest = unionBy(self.listRequest, data, "_id")
        }
      } else {
        return result
      }
    }),
    updateSurveyTask: flow(function* updateSurveyTask(idTask, data) {
      const result = yield self.api.put(`tasks/update-bankId/${idTask}`, data)
      if (result.kind !== "ok") {
        return result
      }
    }),
    getNotes: flow(function* getNotes(id) {
      const param = {
        filter: {
          order: ["createdAt asc"],
          where: {
            belongToId: id,
          },
          limit: 200,
        },
      }
      const result = yield self.api.get("comments", param)
      if (result.kind === "ok") {
        return result?.data?.data
      } else {
        return []
      }
    }),
    getListLoan: flow(function* getListLoan(
      params?: any,
      pagingParams?: PagingParamsType,
      isRefresh = false,
    ) {
      if (isRefresh) {
        self.isRefreshingListLoan = true
      } else {
        self.isLoadingMoreListLoan = true
      }
      const _pagingParams: any = {
        ...self.pagingParamsListLoan,
        ...pagingParams,
      }
      const result = yield self.api.get("deals/bank", {
        filter: {
          skip: 0,
          where: {
            status: params?.status
              ? { inq: [params?.status] }
              : {
                  nin: ["deleted"],
                },
            searchingRule: "single",
            _q: params?.search,
          },
          include: [
            {
              relation: "user",
            },
            {
              relation: "category",
            },
            {
              relation: "assignee",
            },
            {
              relation: "product",
            },
            {
              relation: "dealDetails",
              scope: {
                include: [
                  {
                    relation: "partnerStaff",
                  },
                ],
              },
            },
          ],
        },
        limit: pagingParams?.limit,
        page: pagingParams?.page,
      })
      self.isRefreshingListLoan = false
      self.isLoadingMoreListLoan = false

      if (result.kind === "ok") {
        const data = result?.data?.data
        self.pagingParamsListLoan = _pagingParams
        self.listLoanTotal = result?.data?.total
        if (isRefresh || pagingParams?.page === 1) {
          self.listLoan = data
        } else {
          self.listLoan = unionBy(self.listLoan, data, "id")
        }
      } else {
        return result
      }
    }),
    getTransactionDeal: flow(function* getTransactionDeal(dealId, dealDetailId) {
      const params = {
        filter: {
          where: {
            objectId: dealId,
            "metaData.dealDetailId": dealDetailId,
            include: [
              {
                relation: "transactionDetails",
              },
            ],
          },
        },
      }
      const result = yield self.api.get("transactions", params)
      if (result.kind === "ok") {
        return result?.data?.data
      } else {
        return null
      }
    }),
    getDocumentTemplates: flow(function* getDocument(documentTemplateId) {
      const params = {
        filter: {
          where: {
            documentTemplateId: documentTemplateId,
          },
          limit: 20,
        },
        page: 1,
      }
      const result = yield self.api.get("document-template-details/templates", params)
      if (result.kind === "ok") {
        self.documentTemplates = result?.data?.data
      }
    }),
    getDocumentTemplateFiles: flow(function* getDocumentTemplateFiles(
      documentTemplateId,
      objectId,
    ) {
      const params = {
        filter: {
          where: {
            documentTemplateId: documentTemplateId,
            objectId: objectId,
            objectType: "deal_loan",
          },
          include: [{ relation: "file" }, { relation: "document" }],
        },
      }
      const result = yield self.api.get("document-template-files", params)
      if (result.kind === "ok") {
        self.documentTemplateFiles = result?.data?.data
      }
    }),
    updateDealStatus: flow(function* updateDealStatus(dealDetailId, status, dealId) {
      const result = yield self.api.put(`deal-details/update-status/$${dealDetailId}`, {
        status,
        dealId,
      })
      if (result.kind === "ok") {
        return result?.data?.data
      } else {
        return []
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BankerStoreType = Instance<typeof BankerStoreModel>
export interface BankerStore extends BankerStoreType {}
type BankerStoreSnapshotType = SnapshotOut<typeof BankerStoreModel>
export interface BankerStoreSnapshot extends BankerStoreSnapshotType {}
export const createBankerStoreDefaultModel = () => types.optional(BankerStoreModel, {})
