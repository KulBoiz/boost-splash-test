import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {API_ENDPOINT} from "@env"

// const API_PAGE_SIZE = 50

export class AuthApi {

  private api: Api

  constructor(api: Api) {
    this.api = api
  }


  setUnauthorizedFunction(callback) {
    this.api.onUnauthorized = callback
  }

  setToken(token: string) {
    this.api.apisauce.setHeader("Authorization", "Bearer " + token)
  }

  async login(username: string, password: string): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/login`, {
        username,
        password,
      })

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data = response.data
      return { kind: "ok", data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data", e }
    }
  }

  async refreshToken(refreshToken): Promise<any> {
    const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/refresh`, {
      refresh_token: refreshToken,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return {
      kind: "ok",
      data: response.data.data,
    }
  }

}
