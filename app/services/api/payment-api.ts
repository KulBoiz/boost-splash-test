import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { API_ENDPOINT } from "@env"

export class PaymentApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async post(body?: any): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/transactions/public/insurance-fina`, body)
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

  async confirmTransaction(body?: any): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/payments/pay-me/confirm-transaction`, body)
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

  async transactions(param?: any): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/transactions`, param)
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
