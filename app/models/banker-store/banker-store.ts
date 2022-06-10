import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { BaseApi } from "../../services/api/base-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */

const pathStore = "survey-results"

export const BankerStoreModel = types
  .model("BankerStore")
  .extend(withEnvironment)
  .props({
    surveyResults: types.optional(types.frozen(), {}),
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getSurveyResults: flow(function* getSurveyResults(params?: any) {
      const param = {
        filter: {
          limit: 20,
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
            _q: "",
            status: "deal_processing_task",
          },
        },
        page: 1,
        ...params,
      }
      const result = yield self.api.get(`${pathStore}/search-for-teller`, param)

      self.surveyResults = result?.data?.data

      if (result.kind !== "ok") {
        return result
      }
      // const data = groupBy(
      //   map(result?.data?.data, (item) => ({
      //     ...item,
      //     dateGroup: moment(item.sharedAt).format("MM/YYYY"),
      //   })),
      //   "dateGroup",
      // )
      // Object.keys(data).map((key) => ({
      //   data: data[key],
      //   title: data?.[key]?.[0]?.sub_category_name?.[0] || "",
      //   description: data?.[key]?.[0]?.sub_category_description?.[0] || "",
      // }))
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BankerStoreType = Instance<typeof BankerStoreModel>
export interface BankerStore extends BankerStoreType {}
type BankerStoreSnapshotType = SnapshotOut<typeof BankerStoreModel>
export interface BankerStoreSnapshot extends BankerStoreSnapshotType {}
export const createBankerStoreDefaultModel = () => types.optional(BankerStoreModel, {})
