import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {API_ENDPOINT} from "@env"

// const API_PAGE_SIZE = 50

export class LoanApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async requestLoanDetail(id: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/deals/${id}`, {
        filter: {
          include: [
            { relation: 'user' },
            { relation: 'product' },
            { relation: 'assignee' },
            { relation: 'dealProgress' },
            { relation: 'dealDetails' },
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

  async requestComment(id: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/comments`, {
        filter: {
          where: {
            belongToId: id,
            limit: 20,
            order: ['createdAt asc']
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

  async requestCounselling(sourceId: string, customerName: string, email: string, phone: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/tasks/public`, {
        sourceId, customerName, email, phone, page: "mobile"
      })
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

  async createRequestCounselling(email: string, fullName: string, tel: string, note?: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/tasks/public/insurance`, {
        customerInfo: {email,fullName, tel}, note,type: "counselling", page: 'mobile', productType: "loan"
      })
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


  async getRecords(): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/deals`, {
        "page": 1,
        "order": "createdAt asc",
        "filter": {
          "limit": 10,
          "where": {
            "status": {
              "nin": [
                "deleted"
              ]
            },
            "searchingRule": "single"
          },
          "include": [
            {
              "relation": "user"
            },
            {
              "relation": "category"
            },
            {
              "relation": "assignee"
            },
            {
              "relation": "product"
            },
            {
              "relation": "dealDetails"
            }
          ]
        }
      })
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

  async loadMoreRecords(param): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/deals`, param)
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

  async getRecordDetail(id: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/tasks/${id}`, {})
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

  async getProducts(): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/product-details/public`, {
        filter: {where: {status: 'approved'}, include: [{relation: 'product'}, {relation: "org"}]}
      })
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

  async loadMoreProducts(param): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/product-details/public`,
        {...param, filter: {where: {status: 'approved'}, include: [{relation: 'product'}, {relation: "org"}]}
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

  async getProductDetail(id: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/product-details/public/${id}`, {
        filter: {where: {status: 'approved'}, include: [{relation: 'product'}, {relation: "org"}]}
      })
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
