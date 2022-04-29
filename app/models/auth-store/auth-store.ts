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
    isFirstTime: types.optional(types.boolean, true),
    user: types.frozen({}),
    userId: types.maybeNull(types.string),
    autoRefreshTokenTimeout: types.optional(types.number, 0),
    token: types.maybeNull(types.string),
    refreshing: types.optional(types.boolean, false),
    refreshToken: types.maybeNull(types.string),
    expiresIn: types.maybeNull(types.string),
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
        self.userId = loggedInInfo.user.id
        self.token = loggedInInfo.accessToken
        self.refreshToken = loggedInInfo.refreshToken
        self.expiresIn = loggedInInfo.expiresIn
        self.type = loggedInInfo.type
        self.isLoggedIn = true
        authApi.setToken(self.token)
        authApi.setUnauthorizedFunction(() => {
          return navigate(ScreenNames.LOGIN)
        })
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

    registerEmail: flow(function* registerEmail(telOrEmail: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.registerEmail(telOrEmail)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result.data
      if (loggedInInfo && loggedInInfo.user) {
        self.user = loggedInInfo.user
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

    verifyOtp: flow(function* verifyOtp(otp: string) {
      const authApi = new AuthApi(self.environment.api)
      const userId = self?.user?.id
      const result = yield authApi.verifyOtp(userId, otp)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result.data
      if (loggedInInfo) {
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

    verifyPasswordOtp: flow(function* verifyPasswordOtp(otp:string) {
      const authApi = new AuthApi(self.environment.api)
      const userId = self?.userId
      const result = yield authApi.verifyPasswordOtp(userId, otp)
      if (result.kind !== "ok") {
        return result
      }
        return  {
          kind: "ok",
          data: result,
      }
    }),

    register: flow(function* register(fullName: string, telOrEmail: string, password: string, confirmPassword: string) {
      const authApi = new AuthApi(self.environment.api)
      const userId = self?.user?.id
      const result = yield authApi.register(userId, fullName, telOrEmail, password, confirmPassword)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result.data === null
      if (loggedInInfo) {
        navigate(ScreenNames.LOGIN)
        return  {
          kind: "ok",
          data: result.data,
        }
      }
      return {
        kind: "notOk",
        data: result,
      }
    }),

    forgotPassword: flow(function* forgotPassword(telOrEmail: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.forgotPassword(telOrEmail)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result.data
      if (loggedInInfo && loggedInInfo.userId) {
        self.userId = loggedInInfo.userId
        return  {
          kind: "ok",
          data: result,
        }
      }
      return {
        kind: "notOk",
        data: result.data,
      }
    }),

    changePassword: flow(function* changePassword(password: string, confirmPassword:string) {
      const authApi = new AuthApi(self.environment.api)
      const id = self?.userId
      const result = yield authApi.changePassword(id, password, confirmPassword)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result
      if (loggedInInfo) {
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
      if (!self.expiresIn || !self.token) {
        return true
      }
      return new Date(self.expiresIn).getTime() > new Date().getTime()
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

    setIsFirstTime: flow(function* isFirstTime(check: boolean) {
      self.isFirstTime = check
      return self.isFirstTime
    }),

    refreshTheToken: flow(function* refreshTheToken() {
      const authApi = new AuthApi(self.environment.api)

      if (!self.refreshToken) {
      } else {
        const result = yield authApi.refreshToken(self.refreshToken)
        if (result.kind === "ok") {
          self.token = result.data.token
          self.refreshToken = result.data.refreshToken
          self.expiresIn = result.data.expiresIn
          self.isLoggedIn = self.token !== null
          authApi.setToken(self.token)
        } else {
          self.token = null
          self.refreshToken = null
          self.expiresIn = null
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
      self.userId = null
      self.user = {}
      self.token = null
      self.refreshToken = null
      self.expiresIn = null
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
