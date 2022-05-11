import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {API_ENDPOINT} from "@env"

// const API_PAGE_SIZE = 50

export class CommentApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async requestComment(id: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/comments`, {
        filter: {
          limit: 20,
          order: ['createdAt asc'],
          where: {
            belongToId: id,
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
