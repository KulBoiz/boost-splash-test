import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {API_ENDPOINT} from "@env"

const API_PAGE_SIZE = 100

export class CategoryApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }


  async get(): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/categories/public`, {
        page: 1,
        filter: {
          limit: API_PAGE_SIZE,
          where: {
            type: "insurance_products"
          }
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


}
