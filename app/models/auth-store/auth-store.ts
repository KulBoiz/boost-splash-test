import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { ScreenNames } from "../../navigators/screen-names"
import { withEnvironment } from "../extensions/with-environment"
import { AuthApi } from "../../services/api/auth-api"
import { navigate } from "../../navigators"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UploadApi } from "../../services/api/upload-api"
import { isAndroid } from "../../constants/variable"
import { BaseApi } from "../../services/api/base-api"

export const ROLE = {
  CTV: 'Cộng tác viên',
  KH: 'Khách hàng',
  FINA: 'Nhân viên FINA',
  BANK: 'Nhân viên ngân hàng'
}

const KEY_CTV = 'FINA_COLLABORATOR'

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model("AuthStore")
  .extend(withEnvironment)
  .props({
    isFirstTime: types.optional(types.boolean, true),
    investmentNumber: types.optional(types.string, ''),
    user: types.frozen({}),
    temporaryUser: types.frozen({}),
    vcf: types.frozen(''),
    userId: types.frozen(''),
    autoRefreshTokenTimeout: types.optional(types.number, 0),
    token: types.maybeNull(types.string),
    refreshing: types.optional(types.boolean, false),
    refreshToken: types.maybeNull(types.string),
    expiresIn: types.maybeNull(types.string),
    type: types.maybeNull(types.string),
    isLoggedIn: types.frozen(false),
    role: types.maybeNull(types.string),
    password: types.frozen('')
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    storeUser: (user: any) => {
      self.user = user
    },
    setRole: (role: string) => {
      self.role = role
    },
    setPassword: (password: string) => {
      self.password = password
    },
    login: flow(function* login(email: string, password: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.login(email, password)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result.data
      if (loggedInInfo && loggedInInfo.user) {
        AsyncStorage.setItem("accessToken", loggedInInfo.accessToken)
        self.user = loggedInInfo.user
        self.investmentNumber = loggedInInfo.user.investmentNumber
        self.userId = loggedInInfo.user.id
        self.token = loggedInInfo.accessToken
        self.refreshToken = loggedInInfo.refreshToken
        self.expiresIn = loggedInInfo.expiresIn
        self.type = loggedInInfo.type
        self.isLoggedIn = true

        const { type, positionCodes } = loggedInInfo?.user
        const findPositionCodeCOLLABORATOR = positionCodes?.find(el => el === KEY_CTV)

        if (type === 'customer') {
          self.role = ROLE.KH
        }

        if (findPositionCodeCOLLABORATOR && (type === 'collaborator' || type === 'customer')) {
          self.role = ROLE.CTV
        }

        if (type === 'staff') {
          self.role = ROLE.FINA
        }

        if (type === 'teller') {
          self.role = ROLE.BANK
        }

        authApi.setUnauthorizedFunction(() => {
          return navigate(ScreenNames.LOGIN)
        })
        return {
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
        self.temporaryUser = loggedInInfo.user
        self.userId = loggedInInfo.user.id
        return {
          kind: "ok",
          data: result.data,
        }
      }
      return {
        kind: "notOk",
        data: result.data,
      }
    }),

    resendOtp: flow(function* resendOtp(telOrEmail: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.resendOtp(telOrEmail)
      if (result.kind !== "ok") {
        return result
      }
      if (result) {
        return {
          kind: "ok",
          data: result,
        }
      }
    }),

    verifyOtp: flow(function* verifyOtp(otp: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.verifyOtp(self.userId, otp)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result.data
      if (loggedInInfo) {
        return {
          kind: "ok",
          data: result.data,
        }
      }
      return {
        kind: "notOk",
        data: result.data,
      }
    }),

    verifyPasswordOtp: flow(function* verifyPasswordOtp(otp: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.verifyPasswordOtp(self.userId, otp)
      if (result.kind !== "ok") {
        return result
      }
      return {
        kind: "ok",
        data: result,
      }
    }),

    register: flow(function* register(fullName: string, password: string, confirmPassword: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.register(self.userId, fullName, password, confirmPassword)
      if (result.kind !== "ok") {
        return result
      }
      if (result.response) {
        navigate(ScreenNames.LOGIN)
        return {
          kind: "ok",
          data: result,
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
        return {
          kind: "ok",
          data: result,
        }
      }
      return {
        kind: "notOk",
        data: result.data,
      }
    }),

    changePassword: flow(function* changePassword(password: string, confirmPassword: string) {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.changePassword(self?.userId, password, confirmPassword)
      if (result.kind !== "ok") {
        return result
      }
      const loggedInInfo = result
      if (loggedInInfo) {
        return {
          kind: "ok",
          data: result.data,
        }
      }
      return {
        kind: "notOk",
        data: result.data,
      }
    }),

    getFullInfoUser: flow(function* getFullInfoUser(userId?: string) {
      const id = self.userId
      const authApi = new BaseApi(self.environment.api)
      const result = yield authApi.get(`users/${id}`)
      self.user = result?.data
      self.investmentNumber = result?.data?.investmentNumber
        return result
    }),

    deleteUser: flow(function* deleteUser() {
      const authApi = new BaseApi(self.environment.api)
      const userId = self.userId
      const result = yield authApi.put(`users/${userId}`,{status: 'inactive'})
      return result
    }),

    isExpired: () => {
      if (!self.expiresIn || !self.token) {
        return true
      }
      return new Date(self.expiresIn).getTime() > new Date().getTime()
    },

    setIsFirstTime: flow(function* isFirstTime() {
      self.isFirstTime = false
      return self.isFirstTime
    }),

    refreshTheToken: flow(function* refreshTheToken() {
      const authApi = new AuthApi(self.environment.api)

      if (!self.refreshToken) {
        return false
      }

      const result = yield authApi.refreshToken(self.refreshToken)

      if (result.kind === "ok") {
        self.token = result.data.accessToken
        self.refreshToken = result.data.refreshToken
        AsyncStorage.setItem("accessToken", result.data.accessToken)
        self.isLoggedIn = true
        // authApi.setToken(result.data.accessToken)
        return;
      }
      self.token = null
      self.refreshToken = null

    }),


    uploadAvatar: flow(function* uploadAvatar(image: any) {
      const authApi = new UploadApi(self.environment.api)
      const formData = new FormData()
      const file = {
        uri:  isAndroid ? image.uri : image.uri.replace('file://', ''),
        type: image.type,
        name: image.uri.substring(image.uri.lastIndexOf("/") + 1, image.uri.length),
        fileName: image.fileName
      }
      // @ts-ignore
      formData.append("avatar", file)

      const result = yield authApi.uploadFile(formData)
      const avatarUri  = result.data[0].url
      if (result.kind === "ok") {
         // @ts-ignore
       self.user = {...self.user, avatar: avatarUri ?? ''}
        return result
      }
    }),

    updateUserAvatar: flow(function* updateUserAvatar() {
      const authApi = new AuthApi(self.environment.api)
      const params = {
         // @ts-ignore
        avatar : self.user?.avatar ?? ''
      }
      const result = yield authApi.updateUserAvatar(params, self.userId)
      if (result.kind === "ok") {
        return result.data
      }
    }),

    getVcf: flow(function* getVcf() {
      const authApi = new AuthApi(self.environment.api)
      const result = yield authApi.getVcf(self.userId)
      if (result.kind === "ok") {
        self.vcf = result.data.data
      }
    }),


    logout: () => {
      self.password = ''
      self.userId = ''
      self.investmentNumber = ''
      self.vcf = ''
      self.user = {}
      self.token = null
      self.refreshToken = null
      self.expiresIn = null
      self.type = null
      self.isLoggedIn = false
      self.role = null
      AsyncStorage.setItem('accessToken', '')
    },

    updateInfoUser: flow(function* updateInfoUser(body) {
      const api = new BaseApi(self.environment.api)
      const result = yield api.put(`users/${self.userId}`, body)

      if (result.kind !== "ok") {
        return result
      }
      return {
        kind: "ok",
        data: result,
      }
    }),

    verifyContactUser: flow(function* verifyPasswordOtp(users: any) {
      const api = new BaseApi(self.environment.api)
      const result = yield api.post(`users/verify-contact`, {
        users,
        userId: self.userId
      })

      if (result.kind !== "ok") {
        return result
      }

      return {
        kind: "ok",
        data: result,
      }
    }),

    sendSMS: flow(function* verifyPasswordOtp(phone: any) {
      const api = new BaseApi(self.environment.api)
      const result = yield api.get(`users/send-sms-user/${phone}`)

      if (result.kind !== "ok") {
        return result
      }

      return {
        kind: "ok",
        data: result,
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    autoRefreshToken: () => {
      const autoRefreshTokenTimeout = setInterval(self.refreshTheToken, 60 * 60 * 1000)
      clearInterval(autoRefreshTokenTimeout)
    },
  }))
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
