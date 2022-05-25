import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { API_ENDPOINT } from "@env"

export class TransactionApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getTransaction(objectId: string, dealDetailId: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/transactions`,
        {
          filter: {
            where: {
              objectId: objectId,
              "metaData.dealDetailId": dealDetailId
            },
            include: [{relation: "transactionDetails"}],
            limit: 50
          },
          page: 1,
        }
      )
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }
}
