import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import moment from "moment"
import { BaseApi } from "../../services/api/base-api"
import { groupBy, map, union, unionBy } from "../../utils/lodash-utils"
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
    isRefreshing: false,
    isLoadingMore: false,
    pagingParams: PagingParamsModel,
    surveyResultsTotal: 0,
    surveyResults: types.optional(types.frozen(), {}),
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getSurveyResults: flow(function* getSurveyResults(
      params?: any,
      pagingParams?: PagingParamsType,
      isRefresh = false,
    ) {
      if (isRefresh) {
        self.isRefreshing = true
      } else {
        self.isLoadingMore = true
      }
      const _pagingParams: any = {
        ...self.pagingParams,
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
      self.isRefreshing = false
      self.isLoadingMore = false
      if (result.kind === "ok") {
        const data = result?.data?.data
        self.pagingParams = _pagingParams
        self.surveyResultsTotal = result?.data?.total
        if (isRefresh) {
          self.surveyResults = data
        } else {
          self.surveyResults = unionBy(self.surveyResults, data, "_id")
        }
      } else {
        return result
      }
      if (result.kind !== "ok") {
        return result
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BankerStoreType = Instance<typeof BankerStoreModel>
export interface BankerStore extends BankerStoreType {}
type BankerStoreSnapshotType = SnapshotOut<typeof BankerStoreModel>
export interface BankerStoreSnapshot extends BankerStoreSnapshotType {}
export const createBankerStoreDefaultModel = () => types.optional(BankerStoreModel, {})
