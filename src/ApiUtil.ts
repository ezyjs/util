import axios, { type AxiosInstance, type AxiosError, InternalAxiosRequestConfig } from 'axios'

import { RequestInterceptorModel, ResponseInterceptorModel } from './model'
import { ErrorUtil } from './ErrorUtil'

import type { GetParams, PostParams, PutParams, DeleteParams, PatchParams } from './interface'

/**
 * ApiUtil
 * @desc HTTP 요청을 처리하기 위한 유틸리티 클래스입니다.  
 * 이 클래스는 싱글톤 패턴을 사용하여 구현되었습니다.
 */
export class ApiUtil {
  private static instance: ApiUtil | null = null
  private axiosInstance: AxiosInstance
  private requestInterceptors: RequestInterceptorModel[] = []
  private responseInterceptors: ResponseInterceptorModel[] = []

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
    })

    this.setupErrorHandling()
  }

  /**
   * getInstance
   * @desc ApiUtil의 싱글톤 인스턴스를 반환합니다.  
   * 인스턴스가 존재하지 않는 경우 새로 생성합니다.
   * @param baseURL API 요청의 기본 URL
   * @returns ApiUtil의 싱글톤 인스턴스
   * @example
   * const ApiUtil = ApiUtil.getInstance('https://api.example.com')
   */
  public static getInstance(baseURL: string): ApiUtil {
    if (!ApiUtil.instance) {
      ApiUtil.instance = new ApiUtil(baseURL)
    }

    return ApiUtil.instance
  }

  // Config Method ----------------------------------------------------------------------

  /**
 * setBaseURL
 * @desc API 요청의 기본 URL을 설정
 * @param baseURL 설정할 새로운 기본 URL
 * @example
 * apiUtil.setBaseURL('https://new-api.example.com')
 */
  public setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL
  }

  /**
 * setTimeout
 * @desc API 요청의 타임아웃을 설정
 * @param timeout 설정할 타임아웃 (밀리초)
 */
  public setTimeout(timeout: number): void {
    this.axiosInstance.defaults.timeout = timeout
  }

  /**
   * setDefaultHeaders
   * @desc API 요청의 기본 헤더를 설정
   * @param headers 설정할 헤더 객체
   */
  public setDefaultHeaders(headers: Record<string, string>): void {
    Object.assign(this.axiosInstance.defaults.headers.common, headers)
  }

  // Interceptor Setting Method ----------------------------------------------------------------------

  /**
  * setupInterceptors
  * @desc Axios 인스턴스에 인터셉터를 설정
  */
  public setupInterceptors(): void {
    // 기존 인터셉터 제거
    this.axiosInstance.interceptors.request.clear()
    this.axiosInstance.interceptors.response.clear()

    // 요청 인터셉터 설정
    this.requestInterceptors.forEach(interceptor => {
      this.axiosInstance.interceptors.request.use(
        interceptor.onFulfilled,
        interceptor.onRejected
      )
    })

    // 응답 인터셉터 설정
    this.responseInterceptors.forEach(interceptor => {
      this.axiosInstance.interceptors.response.use(
        interceptor.onFulfilled,
        interceptor.onRejected
      )
    })
  }

  /**
   * addRequestInterceptor
   * @desc 요청 인터셉터 추가
   * @param interceptor 추가할 요청 인터셉터
   */
  public addRequestInterceptor(interceptor: RequestInterceptorModel): void {
    this.requestInterceptors.push(interceptor)
    this.requestInterceptors.sort((a, b) => b.priority - a.priority)
  }

  /**
   * addResponseInterceptor
   * @desc 응답 인터셉터 추가
   * @param interceptor 추가할 응답 인터셉터
   */
  public addResponseInterceptor(interceptor: ResponseInterceptorModel): void {
    this.responseInterceptors.push(interceptor)
    this.responseInterceptors.sort((a, b) => b.priority - a.priority)
  }

  // Error Handling Method ----------------------------------------------------------------------

  /**
   * setupErrorHandling
   * @desc Axios 인스턴스에 전역 에러 핸들링을 설정합니다.
   */
  private setupErrorHandling(): void {
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        return this.handleApiError(error)
      }
    )
  }

  /**
   * handleApiError
   * @desc API 에러를 처리합니다.
   * @param error AxiosError 객체
   */
  private handleApiError(error: AxiosError): Promise<never> {
    const errorDetails = {
      url: error.config?.url,
      method: error.config?.method,
    }

    let errorCode: string
    let errorMessage: string

    switch (true) {
      // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
      case !!error.response: {
        errorCode = `API_ERROR_${error.response?.status}`
        errorMessage = (error.response?.data as any).message || error.message
        break
      }

      // 요청이 이루어졌으나 응답을 받지 못한 경우
      case !!error.request: {
        errorCode = 'API_NO_RESPONSE'
        errorMessage = 'No response received from the server'
        break
      }

      // 요청 설정 중에 오류가 발생한 경우
      default: {
        errorCode = 'API_REQUEST_SETUP_ERROR'
        errorMessage = error.message
      }
    }

    const apiError = ErrorUtil.createError(errorCode, errorMessage, errorDetails)
    ErrorUtil.logError(apiError)

    return Promise.reject(apiError)
  }

  // HTTP Method ----------------------------------------------------------------------

  /**
   * get
   * @desc GET 요청을 보내고 응답을 파싱합니다.
   * @param url 요청 URL
   * @param config Axios 요청 설정 (Optional)
   */
  public async get<T, P = any>({ url, params, config }: GetParams<P>): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, { ...config, params })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error)
      }

      throw error
    }
  }

  /**
   * post
   * @desc POST 요청을 보내고 응답을 파싱합니다.
   * @param url 요청 URL
   * @param data 요청 본문 데이터 (Optional)
   * @param config Axios 요청 설정 (Optional)
   */
  public async post<T, D = any>({ url, data, config }: PostParams<D>): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error)
      }

      throw error
    }
  }

  /**
 * delete
 * @desc DELETE 요청을 보내고 응답을 파싱합니다.
 * @param url 요청 URL
 * @param config Axios 요청 설정 (Optional)
 */
  public async delete<T>({ url, config }: DeleteParams): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error)
      }

      throw error
    }
  }

  /**
   * put
   * @desc PUT 요청을 보내고 응답을 파싱합니다.
   * @param url 요청 URL
   * @param data 요청 본문 데이터 (Optional)
   * @param config Axios 요청 설정 (Optional)
   */
  public async put<T, D = any>({ url, data, config }: PutParams<D>): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error)
      }

      throw error
    }
  }

  /**
   * patch
   * @desc PATCH 요청을 보내고 응답을 파싱합니다.
   * @param url 요청 URL
   * @param data 요청 본문 데이터 (Optional)
   * @param config Axios 요청 설정 (Optional)
   */
  public async patch<T, D = any>({ url, data, config }: PatchParams<D>): Promise<T> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleApiError(error)
      }

      throw error
    }
  }
}