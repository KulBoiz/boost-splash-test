import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { API_ENDPOINT } from "@env"

export class DocumentTemplateApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async loadTemplate(documentTemplateId: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/document-template-details/templates`,
        {
          filter: {
            where: {
              documentTemplateId: documentTemplateId,
            },
            limit: 20
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

  async loadFileTemplate(documentTemplateId: string, objectId: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`${API_ENDPOINT}/document-template-files`, {
        filter: {
          where: {
            documentTemplateId: documentTemplateId,
            objectId: objectId,
            objectType: 'deal_loan',
          },
          include: [
            { relation: 'file' },
            { relation: 'document' }
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

}
