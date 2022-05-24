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

  // setToken(token: string) {
  //   this.api.apisauce.setHeader("Authorization", "Bearer " + token)
  // }

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
      return { kind: "bad-data", e }
    }
  }

  async registerEmail(telOrEmail: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/signup-by-phone-or-email`, {
        telOrEmail
      })
      if (!response.ok) {
        return response.data
      }
      const data = response.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

  async resendOtp(telOrEmail: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/users/send-otp`, {
        telOrEmail
      })
      if (!response.ok) {
        return response
      }
      const data = response
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

  async verifyOtp(id, otp: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/signup/${id}/verify-otp`, {
        otp
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

  async verifyPasswordOtp(id: string,otp: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/otp/verify/${id}`, {
        otp
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data", e }
    }
  }

  async register(id: string, fullName: string, password: string, confirmPassword): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(`${API_ENDPOINT}/users/${id}/register-information-user`, {
        fullName, password, confirmPassword
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

  async forgotPassword(telOrEmail: string): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(`${API_ENDPOINT}/users/recover-password`, {
        telOrEmail
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

  async changePassword(id:string, password: string, confirmPassword): Promise<any> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(`${API_ENDPOINT}/users/${id}/reset-password`, {
        password, confirmPassword
      })
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response
      return { kind: "ok", data }
    } catch (e) {
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
