import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import moment from "moment"
import { BaseApi } from "../../services/api/base-api"
import { groupBy, map } from "../../utils/lodash-utils"
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
      isRefresh = true,
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
      const result = yield self.api.get("/survey-results/search-for-teller", {
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
        const dataGroup = groupBy(
          map(data, (item) => ({
            ...item,
            dateGroup: moment(item.sharedAt).format("MM/YYYY"),
          })),
          "dateGroup",
        )
        const surveyResults = Object.keys(dataGroup).map((key) => ({
          data: dataGroup[key],
          title: `YCTV mới (${key})`,
        }))
        __DEV__ && console.tron.log(surveyResults)
        self.pagingParams = _pagingParams
        if (isRefresh) {
          self.surveyResults = surveyResults
        } else {
          self.surveyResults = self.surveyResults.concat(surveyResults)
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
