import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { UploadApi } from "../../services/api/upload-api"
import mime from "mime"
import * as FileSystem from "expo-file-system"
import { AgentApi } from "../../services/api/agent-api"
import { withRootStore } from "../extensions/with-root-store"

/**
 * Model description here for TypeScript hints.
 */
export const AgentStoreModel = types
  .model("AgentStore")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    fullName: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    bankNumber: types.optional(types.string, ""),
    bankName: types.optional(types.string, ""),
    address: types.optional(types.string, ""),
    bankId: types.optional(types.string, ""),
    bankBranchId: types.optional(types.string, ""),
    provinceId: types.optional(types.string, ""),
    provinceName: types.optional(types.string, ""),
    districtId: types.optional(types.string, ""),
    districtName: types.optional(types.string, ""),
    communeId: types.optional(types.string, ""),
    communeName: types.optional(types.string, ""),
    sex: types.optional(types.string, ""),
    citizenIdentification: types.optional(types.string, ""),
    dateRange: types.optional(types.string, ""),
    issuedBy: types.optional(types.string, ""),
    frontImage: types.frozen({}),
    backImage: types.frozen({}),
    signature: types.frozen({}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    userInfo: flow(function* userInfo(
      sex: string,
      email: string,
      phone: string,
      bankNumber: string,
      bankBranchId?: string,
      address: string,
    ) {
      self.sex = sex
      self.email = email
      self.phone = phone
      self.bankNumber = bankNumber
      self.bankBranchId = bankBranchId ?? ""
      self.address = address
    }),

    userId: flow(function* userId(
      fullName: string,
      citizenIdentification: string,
      dateRange: string,
      issuedBy: string,
    ) {
      self.fullName = fullName
      self.citizenIdentification = citizenIdentification
      self.dateRange = dateRange
      self.issuedBy = issuedBy
    }),

    bankInfo: (bankName: string, bankId: string) =>  {
      self.bankName = bankName
      self.bankId = bankId
    },

    province: (provinceName: string, provinceId: string) =>  {
      self.provinceName = provinceName
      self.provinceId = provinceId
    },

    district: (districtName: string, districtId: string) =>  {
      self.districtName = districtName
      self.districtId = districtId
    },

    commune: (communeName: string, communeId: string) =>  {
      self.communeName = communeName
      self.communeId = communeId
    },

    uploadFrontImage: flow(function* uploadFrontImage(path: string) {
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
      formData.append("identification.frontPhoto", file)
      const result = yield uploadApi.uploadFile(formData)
      const data = result?.data
      if (result.kind !== "ok") {
        return result
      }
      self.frontImage = data[0]
      return {
        kind: "ok",
        data: result.data,
      }
    }),

    uploadBackImage: flow(function* uploadBackImage(path: string) {
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
      formData.append("identification.backSidePhoto", file)
      const result = yield uploadApi.uploadFile(formData)
      const data = result?.data
      if (result.kind !== "ok") {
        return result
      }
      self.backImage = data[0]
      return {
        kind: "ok",
        data: result,
      }
    }),

    uploadBase64: flow(function* uploadBase64(image: string) {
      const agentApi = new UploadApi(self.environment.api)
      const params = {
        image: `data:image/png;base64,${image}`, name: `signature-${image?.slice(0,20)}`
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

    registerInformation: flow(function* registerInformation() {
      const agentApi = new AgentApi(self.environment.api)
      const userId: any = new AgentApi(self?.rootStore?.authStoreModel.userId) ?? ''

      const params = {
        address: self.address,
        banks: [
          {
            bankAccount: self.bankNumber,
            bankId: self.bankId,
            name: self.bankName
          }
        ],
        districtId: self.districtId,
        districtName: self.districtName,
        emails: [
          {
            email: self.email
          }
        ],
        gender: self.sex,
        hasVerifyOtp: false,
        stateId: self.provinceId,
        stateName: self.provinceName,
        steps: "person-information",
        subDistrictId: self.communeId,
        subDistrictName: self.communeName,
        tels: [
          {
            tel: self.phone
          }
        ]
      }

      const result = yield agentApi.registerInformation(params, userId?.api)
      if (result.kind !== "ok") {
        return result
      }
      return {
        kind: "ok",
        data: result,
      }
    }),

    registerAgent: flow(function* registerAgent() {
      const agentApi = new AgentApi(self.environment.api)
      const userId: any = new AgentApi(self?.rootStore?.authStoreModel.userId) ?? ''

      const params = {
        fullName: self.fullName,
        hasVerifyOtp: false,
        idNumber: self.citizenIdentification,
        identification: {
          frontPhoto: self.frontImage,
          backSidePhoto :self.backImage,
          signature: self.signature,
          issuedOn: self.dateRange,
          placeOfIssue: self.issuedBy,
        },
        steps: "contract"
      }

      const result = yield agentApi.registerAgent(params, userId?.api)
      if (result.kind !== "ok") {
        return result
      }
      return {
        kind: "ok",
        data: result,
      }
    }),

    getDetailAgent: flow(function* getDetailAgent() {
      const agentApi = new AgentApi(self.environment.api)
      const userId: any = new AgentApi(self?.rootStore?.authStoreModel.userId) ?? ''

      const result = yield agentApi.getDetailAgent(userId?.api)
      if (result.kind !== "ok") {
        return result
      }
      return {
        kind: "ok",
        data: result,
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AgentStoreType = Instance<typeof AgentStoreModel>
export interface AgentStore extends AgentStoreType {}
type AgentStoreSnapshotType = SnapshotOut<typeof AgentStoreModel>
export interface AgentStoreSnapshot extends AgentStoreSnapshotType {}
export const createAgentStoreDefaultModel = () => types.optional(AgentStoreModel, {})
