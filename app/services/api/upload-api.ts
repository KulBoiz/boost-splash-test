import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {API_ENDPOINT} from "@env"

// const API_PAGE_SIZE = 50

export class UploadApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async uploadFile(params): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/files`,
        params,
        {headers:{
          'Content-Type': 'multipart/form-data'
        }}
        )
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response?.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

  async uploadBase64(params: any): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/file/upload-base64`, params)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response?.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }
}
