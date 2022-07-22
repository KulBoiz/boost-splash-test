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
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/deals`, {
        filter: {
          where: {
            taskId: id
          },
          include: [
            { relation: 'user' },
            { relation: 'product' },
            { relation: 'assignee' },
            {
              relation: 'dealDetails',
              scope: {
                include: [
                  { relation: 'partner' },
                ]
              }
            },
          ]
        }
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response?.data?.data?.[0]
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

  async requestLoanHistory(id: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/tasks/${id}/status-histories`)
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
        sourceId, customerName, email, phone, page: "mobile", rootTask: 'Mobile App'
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

  async createRequestCounselling(email: string, fullName: string, tel: string, note?: string, sourceId?: any, type?: string, productId?: string, images?: any): Promise<any> {
    try {
      // make the api call
      const body: any = {
        customerInfo: { email, fullName, tel },
        note,
        type: type || "counselling",
        page: 'mobile',
        productType: "loan",
        rootTask: 'Mobile App',
        images
      }
      if (sourceId) {
        body.sourceId = sourceId
      }

      if (productId) {
        body.productId = productId
      }

      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/tasks/public/insurance`, body)

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


  async getRecords(param): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/tasks`, param)
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
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/tasks`, param)
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
    const filter = {
      "include": [
        {
          "relation": "user"
        },
        {
          "relation": "assignee"
        },
        {
          "relation": "product"
        },
      ]
    }
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/tasks/${id}`, {filter})
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

  async getProducts(param): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/product-details/public`, param)
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
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/product-details/public`, param)
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
