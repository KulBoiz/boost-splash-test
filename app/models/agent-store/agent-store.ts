import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { UploadApi } from "../../services/api/upload-api"
import mime from 'mime';

/**
 * Model description here for TypeScript hints.
 */
export const AgentStoreModel = types
  .model("AgentStore")
  .extend(withEnvironment)
  .props({
    fullName: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    phone: types.optional(types.string, ''),
    bankNumber: types.optional(types.string, ''),
    bankName: types.optional(types.string, ''),
    bankBranch: types.optional(types.string, ''),
    province: types.optional(types.string, ''),
    district: types.optional(types.string, ''),
    commune: types.optional(types.string, ''),
    address: types.optional(types.string, ''),
    sex: types.optional(types.string, ''),
    citizenIdentification : types.optional(types.string, ''),
    dateRange: types.optional(types.string, ''),
    issuedBy: types.optional(types.string, ''),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
      userInfo: flow(function* userInfo(sex: string, email: string, phone: string, bankNumber: string,
      bankName: string, bankBranch?: string, province: string, district: string, commune: string, address: string) {
              self.sex = sex
              self.email = email
              self.phone = phone
              self.bankNumber= bankNumber
              self.bankName = bankName
              self.bankBranch = bankBranch ?? ''
              self.province = province
              self.district = district
              self.commune =  commune
              self.address = address
      }),

      userId: flow(function* userId(fullName: string,citizenIdentification: string, dateRange: string, issuedBy: string) {
              self.fullName = fullName
              self.citizenIdentification = citizenIdentification
              self.dateRange = dateRange
              self.issuedBy = issuedBy
      }),

    uploadFrontImage: flow(function* uploadFrontImage(path: string) {
      const uploadApi = new UploadApi(self.environment.api)
      const formData = new FormData();
        const file = {
          uri: path.startsWith('ph://') ? `ph-upload${path.substring(2)}` : path,
          name: path.substring(path.lastIndexOf('/') + 1, path.length),
          filename: path.substring(path.lastIndexOf('/') + 1, path.length) + 'jpg',
          type: mime.getType(path) ?? 'image/jpg' ,
        };
        formData.append('identification.frontPhoto', file);

      console.log('formData', formData)
      const result = yield uploadApi.uploadFile(formData)
      if (result.kind !== "ok") {
        return result
      }
      return {
        kind: "ok",
        data: result.data,
      }
    }),

    uploadBackImage: flow(function* uploadBackImage(path: string) {
      const uploadApi = new UploadApi(self.environment.api)
      const formData = new FormData();
      const file = {
        uri: path.startsWith('ph://') ? `ph-upload${path.substring(2)}` : path,
        name: path.substring(path.lastIndexOf('/') + 1, path.length),
        filename: path.substring(path.lastIndexOf('/') + 1, path.length) + 'jpg',
        type: mime.getType(path),
      };
      formData.append('identification.backSidePhoto', file);
      const result = yield uploadApi.uploadFile(formData)
      if (result.kind !== "ok") {
        return result
      }
      return {
        kind: "ok",
        data: result.data,
      }
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AgentStoreType = Instance<typeof AgentStoreModel>
export interface AgentStore extends AgentStoreType {}
type AgentStoreSnapshotType = SnapshotOut<typeof AgentStoreModel>
export interface AgentStoreSnapshot extends AgentStoreSnapshotType {}
export const createAgentStoreDefaultModel = () => types.optional(AgentStoreModel, {})
