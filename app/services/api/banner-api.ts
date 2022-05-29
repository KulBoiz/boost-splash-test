import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {API_ENDPOINT} from "@env"

// const API_PAGE_SIZE = 50

export class BannerApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }


  async getPublicBanners(): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/banners/public`, {
        page: 1,
        filter: {
          limit: 20,
          order: ['priority asc'],
        }
      })
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

  async getPublicBannerDetail(id): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/news/public/by-slug/${id}`)
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

  async getPublicNews(): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/news/public`, {
        page: 1,
        filter: {
          limit: 20,
          // order: ['priority asc'],
        }
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response?.data?.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }


}
