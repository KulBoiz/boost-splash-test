import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { API_ENDPOINT } from "@env"

const API_PAGE_SIZE = 20

export class ProductApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async get(params?: any): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/products/public`, {
        page: 1,
        filter: {
          limit: API_PAGE_SIZE,
          where: {
            type: "insurances",
            ...params
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

  async getDetail(id: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/products/public/${id}`, {
        filter: {
          include: [
            { relation: 'questionGroup' },
            { relation: 'org' },
            {
              relation: 'category',
              scope: {
                include: [{ relation: "commissionSettings" }]
              }
            }
          ]
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

  async getTransactionInsurance(productId: string, search: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/transactions`,
        {
          filter: {
            order: ['createdAt DESC'],
            where: {
              productId: productId,
              _q: search,
            },
            include: [
              { relation: "transactionDetails" },
              { relation: "staff" },
              { relation: "product" },
            ],
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
