import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withRootStore } from "../extensions/with-root-store"
import { BaseApi } from "../../services/api/base-api"
import { UploadApi } from "../../services/api/upload-api"
import * as FileSystem from "expo-file-system"
import mime from "mime"
import moment from "moment"

/**
 * Model description here for TypeScript hints.
 */
export const EkycStoreModel = types
  .model("EkycStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    user: types.frozen({}),
    frontImage: types.frozen({}),
    backImage: types.frozen({}),
    portraitImage: types.frozen({}),
    signature: types.frozen({}),
    firstTimePressImage: types.frozen(true),
    firstTimeKyc: types.frozen(true)
  })
  .views((self) => ({
    get api() {
      return new BaseApi(self.environment.api)
    },
    userId() {
      return self?.rootStore?.authStoreModel.userId
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getIdentityInfo: flow(function* getIdentityInfo(img) {
      const result = yield self.api.post("users/get-personal-info-upload", {
          img,
        },
      )
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
    }),

    checkSyncMio: flow(function* checkSyncMio() {
      const result = yield self.api.post("users/check-investor-existed-on-mio",{})
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
    }),

    kycMio: flow(function* kycMio(param) {
      const result = yield self.api.post("users/mio-kyc", {
          param,
        },
      )
        return result
    }),

    verifyMioOtp: flow(function* verifyMioOtp(otpCOde) {
      const result = yield self.api.post(`users/verify-otp-e-sign-by-mio`, {
        otpCOde,
        },
      )
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
    }),

    resendMioOtp: flow(function* resendMioOtp() {
      const result = yield self.api.get(`users/resend-otp-e-sign-with-mio`)
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
    }),

    verifySyncMioOtp: flow(function* verifySyncMioOtp(otpCOde) {
      const result = yield self.api.post(`users/verify-otp-e-sign-by-mio`, {
        otpCOde,
        },
      )
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
    }),
    resendSyncMioOtp: flow(function* resendSyncMioOtp() {
      const result = yield self.api.get(`users/resend-otp-e-sign-with-mio`)
      const data = result?.data
      if (result.kind === "ok") {
        return data
      }
    }),

    updateUser: (user) => {
      self.user = user
    },
    deleteUser: () => {
      self.user = {}
    },

    uploadImage: flow(function* uploadImage(type: 'front'| 'back'| 'portrait' | 'signature', path: string) {
      const uploadApi = new UploadApi(self.environment.api)
      const fileName = path.substring(path.lastIndexOf("/") + 1, path.length) + ".jpg"
      const destPath = FileSystem.cacheDirectory + "/" + fileName
      if (path.startsWith("assets") || path.startsWith("ph://")) {
        yield FileSystem.copyAsync({ from: path, to: destPath })
      }
      const formData = new FormData()
      const file = {
        uri: destPath,
        name: path.substring(path.lastIndexOf("/") + 1, path.length),
        filename: fileName,
        type: mime.getType(path) ?? "image/jpg",
      }
      formData.append(`identification.${type}`, file)
      const result = yield uploadApi.uploadFile(formData)
      const data = result?.data
      if (result.kind !== "ok") {
        return result
      }
      if ( type === 'front'){
        self.frontImage = data[0]
      }
      if ( type === 'back'){
        self.backImage = data[0]
      }
      if ( type === 'portrait'){
        self.portraitImage = data[0]
      }
      if ( type === 'signature'){
        self.signature = data[0]
      }
      return {
        kind: "ok",
        data: result.data,
      }
    }),

    uploadBase64: flow(function* uploadBase64(image: string) {
      const agentApi = new UploadApi(self.environment.api)
      const params = {
        image: `data:image/png;base64,${image}`, name: `signature-${moment(new Date()).format('x').toString()}`
      }
      const result = yield agentApi.uploadBase64(params)
      const data = result.data
      if (result.kind !== "ok") {
        return result
      }
      self.signature = data
      return {
        kind: "ok",
        data: result,
      }
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type EkycStoreType = Instance<typeof EkycStoreModel>

export interface EkycStore extends EkycStoreType {
}

type EkycStoreSnapshotType = SnapshotOut<typeof EkycStoreModel>

export interface EkycStoreSnapshot extends EkycStoreSnapshotType {
}

export const createEkycStoreDefaultModel = () => types.optional(EkycStoreModel, {})
