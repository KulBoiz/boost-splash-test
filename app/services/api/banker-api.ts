import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { API_ENDPOINT } from "@env"

// const API_PAGE_SIZE = 50

export class BankerApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getSurveyResults(params: any): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        `${API_ENDPOINT}/survey-results/search-for-teller`,
        params,
      )
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }
}
