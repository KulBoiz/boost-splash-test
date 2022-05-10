import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { NotificationApi } from "../../services/api/notification"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const NotificationStoreModel = types
  .model("NotificationStore")
  .extend(withEnvironment)
  .props({
    dataSources: types.frozen([]),
    limit: types.optional(types.number, 20),
    page: types.optional(types.number, 1)
  })
  .views(() => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDataSource: (dataSources) => {
      self.dataSources = dataSources
    },

    getListNotifications: flow(function* getListNotifications(filters, userId) {
      const api = new NotificationApi(self.environment.api)

      const params = {
        userId: userId,
        page: self.page,
        filter: {
          limit: 20,
          skip: 0,
          ...filters
        }
      }
      const result = yield api.getNotificationPagination('notifications', params)
      self.dataSources = result?.data
      if (result.kind === "ok") {
        return {
          kind: "ok",
          data: result.data,
        }
      }

      return {
        kind: "notOk",
        data: result,
      }
    }),

    readAllNotifications: flow(function* readAllNotifications() {
      const api = new NotificationApi(self.environment.api)
      const result = yield api.readAllNotifications('notifications/read-all')

      if (result.kind === "ok") {
        return {
          kind: "ok",
          data: result.data,
        }
      }

      return {
        kind: "notOk",
        data: result,
      }
    }),

    readNotifications: flow(function* readNotifications(item: any) {
      const api = new NotificationApi(self.environment.api)
      const notiRead: any = {
        ...item,
        status: 'READ'
      }
      const result = yield api.readNotifications('notifications', item?.id, { status: notiRead?.status })
      const dataSources: any = [...self.dataSources]
      const index = dataSources?.findIndex((el: any) => item?.id === el.id)
      dataSources.splice(index, 1, notiRead)
      self.dataSources = dataSources

      if (result.kind === "ok") {
        return {
          kind: "ok",
          data: result.data,
        }
      }

      return {
        kind: "notOk",
        data: result,
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationStoreType = Instance<typeof NotificationStoreModel>
export interface NotificationStore extends NotificationStoreType { }
type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>
export interface NotificationStoreSnapshot extends NotificationStoreSnapshotType { }
export const createNotificationStoreDefaultModel = () => types.optional(NotificationStoreModel, {})