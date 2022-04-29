import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { API_ENDPOINT } from "@env"

// const API_PAGE_SIZE = 50

export class NotificationApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }


  setUnauthorizedFunction(callback) {
    this.api.onUnauthorized = callback
  }

  setToken(token: string) {
    this.api.apisauce.setHeader("Authorization", "Bearer " + token)
  }

  async getNotificationPagination(nodeName: string, params: any): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/${nodeName}`, params)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data = response?.data?.data || []
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

  async readAllNotifications(nodeName: string,): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/${nodeName}`)

      // the typical ways to die when calling an api
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

  async readNotifications(nodeName: string, id: string, body: any): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.put(`${API_ENDPOINT}/${nodeName}/${id}`, body)

      // the typical ways to die when calling an api
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
