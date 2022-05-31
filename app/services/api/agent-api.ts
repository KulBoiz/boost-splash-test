import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {API_ENDPOINT} from "@env"

// const API_PAGE_SIZE = 50

export class AgentApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async registerAgent(params: any, id:string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}https://crm-beta.fina.com.vn/api/v1/users/sign-collaborator-contract/${id}`, params)
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", response }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

}
