import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { ScreenNames } from "../../navigators/screen-names"
import { withEnvironment } from "../extensions/with-environment"
import { AuthApi } from "../../services/api/auth-api"
import { navigate } from "../../navigators"

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .extend(withEnvironment)
  .props({
    user: types.frozen({}),
    autoRefreshTokenTimeout: types.optional(types.number, 0),
    token: types.maybeNull(types.string),
    refreshing: types.optional(types.boolean, false),
    refreshToken: types.maybeNull(types.string),
    expires: types.maybeNull(types.string),
    type: types.maybeNull(types.string),
    isLoggedIn: types.optional(types.boolean, false),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    storeUser: (user: any) => {
      self.user = user
    },
    login: flow(function* login(email: string, password: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.login(email, password)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result.data
      if (loggedInInfo && loggedInInfo.user) {
        self.user = loggedInInfo.user
        self.token = loggedInInfo.accessToken
        self.refreshToken = loggedInInfo.refreshToken
        self.expires = loggedInInfo.expires
        self.type = loggedInInfo.type
        self.isLoggedIn = true
        authApi.setToken(self.token)
        authApi.setUnauthorizedFunction(() => {
          return navigate(ScreenNames.LOGIN)
        })
        navigate(ScreenNames.APP)
        return  {
          kind: "ok",
          data: result.data,
        }
      }
      return {
        kind: "notOk",
        data: result.data,
      }
    }),
    isExpired: () => {
      if (!self.expires || !self.token) {
        return true
      }
      return new Date(self.expires).getTime() > new Date().getTime()
    },

    setToken: () => {
      const authApi = new AuthApi(self.environment.api)
      if (self.token) {
        authApi.setUnauthorizedFunction(() => {
          return navigate(ScreenNames.LOGIN)
        })
        authApi.setToken(self.token)
      }
    },

    refreshTheToken: flow(function* refreshTheToken() {
      const authApi = new AuthApi(self.environment.api)

      if (!self.refreshToken) {
      } else {
        const result = yield authApi.refreshToken(self.refreshToken)
        if (result.kind === "ok") {
          self.token = result.data.token
          self.refreshToken = result.data.refreshToken
          self.expires = result.data.expires
          self.isLoggedIn = self.token !== null
          authApi.setToken(self.token)
        } else {
          self.token = null
          self.refreshToken = null
          self.expires = null
          self.isLoggedIn = false
          authApi.setToken(null)
          // getParent(self).navigationStore.navigateTo("loginScreen")
        }
      }
    }),
    autoRefreshToken: () => {
      clearInterval(self.autoRefreshTokenTimeout)
      self.autoRefreshTokenTimeout = setInterval(self.refreshTheToken, 20 * 60 * 1000)
    },

    logout: () => {
      self.user = null
      self.token = null
      self.refreshToken = null
      self.expires = null
      self.type = null
      self.isLoggedIn = false
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type AuthStoreType = Instance<typeof AuthStoreModel>

export interface AuthStore extends AuthStoreType { }

type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>

export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
