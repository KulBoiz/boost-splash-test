import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { API_ENDPOINT } from "@env"
import { BaseApi } from "./base-api"

// const API_PAGE_SIZE = 50

export const PRODUCT_TYPE = {
	LOAN: 'loan',
	INSURANCE: 'insurances',
	INVESTMENT: 'investment',
	BONDS: 'bonds',
};

// export const PRODUCT_TYPES = {
// 	loan: 'loan_products',
// 	insurance: 'insurance_products',
// 	real_estate: 'real_estate_products',
// 	investment: 'investment_products',
// 	news: 'news',
// 	funds: 'funds',
// };

export const TASK_PRODUCT_TYPES = {
	loan: 'loan',
	insurances: 'insurances',
	investment: 'investment',
	real_estate: 'real_estate',
	other: 'other',
};

export const TASK_TYPES = {
  CALL: 'call',
  COUNSELLING: 'counselling',
  DEAL_PROCESSING_TASK: 'deal_processing_task',
  WANT_TO_BUY: 'WANT_TO_BUY',
  INTRODUCE_BUYER: 'INTRODUCE_BUYER',
  CLAIM_INSURANCE: 'claim_insurance',
  BOND: 'BOND',
  FUND: 'FUND',
  INSURANCE: 'INSURANCE',
	REAL_ESTATE: 'REAL_ESTATE',
};

export const PRODUCT_TYPES = (t) => (
	[
		{ label: t('Loan', { vn: 'Vay vốn' }), value: TASK_PRODUCT_TYPES.loan },
		{ label: t('Insurance', { vn: 'Bảo hiểm' }), value: TASK_PRODUCT_TYPES.insurances },
		{ label: t('Investment', { vn: 'Đầu tư' }), value: TASK_PRODUCT_TYPES.investment },
		{ label: t('Real Estate', { vn: 'Bất động sản' }), value: TASK_PRODUCT_TYPES.real_estate },
		{ label: t('Other', { vn: 'Khác' }), value: TASK_PRODUCT_TYPES.other },
	]
);

export const MAPPING_PRODUCT_TYPES_TO_TYPE_TASK = {
	[TASK_PRODUCT_TYPES.loan]: TASK_TYPES.COUNSELLING,
	[TASK_PRODUCT_TYPES.insurances]: TASK_TYPES.INSURANCE,
	[TASK_PRODUCT_TYPES.investment]: TASK_TYPES.BOND,
	[TASK_PRODUCT_TYPES.real_estate]: TASK_TYPES.REAL_ESTATE,
	// [TASK_PRODUCT_TYPES.other]: TASK_TYPES.OTHER,
};
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

  async requestCounselling(sourceId: string, customerName: string, email: string, phone: string, type?: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/tasks/public`, {
        sourceId,
        customerName,
        email,
        phone,
        page: "mobile",
        rootTask: 'Mobile App',
        type: type || "counselling",
        productType: "loan",
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

  async createRequestCounselling(
    email: string,
    fullName: string,
    tel: string,
    note?: string,
    sourceId?: any,
    type?: string,
    productId?: string,
    images?: any,
    metadata?: any,
  ): Promise<any> {
    try {
      // make the api call
      const body: any = {
        customerInfo: { email, fullName, tel },
        note,
        type: type || "counselling",
        page: 'mobile',
        productType: "loan",
        rootTask: 'Mobile App',
        images,
        metadata,
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
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/tasks/${id}`, { filter })
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
        filter:
        {
          where: { status: 'approved' },
          include: [
            { relation: 'product' },
            { relation: "org" },
          ]
        }
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data = response.data
      if (response.data?.documentTemplateId) {
        const responseDocumentTemplate: any = await this.api.apisauce.get(`${API_ENDPOINT}/document-template-details/templates?documentTemplateId=${response.data?.documentTemplateId}`, {
          filter: {
            limit: 50,
            skip: 0,
            where: {
              documentTemplateId: response.data?.documentTemplateId
            }
          },
          page: 1
        })

        return { kind: "ok", data: { ...data, responseDocumentTemplate: responseDocumentTemplate?.data?.data } }
      }

      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

}
