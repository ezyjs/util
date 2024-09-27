import type { AxiosRequestConfig } from 'axios'

export type DateFormat = 'YYYY' | 'MM' | 'DD' | 'YYYY-MM' | 'YYYY-MM-DD'

export interface Config {
  [key: string]: string | number | boolean | Config
}

export interface APIResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

/**
 * Interceptor
 * @desc Interceptor 기본 인터페이스
 */
export interface Interceptor {
  id: string
  priority: number
}


export interface GetParams<P = any> {
  url: string
  params?: P
  config?: AxiosRequestConfig
}

export interface PostParams<D = any> {
  url: string
  data?: D
  config?: AxiosRequestConfig
}

export interface DeleteParams {
  url: string
  config?: AxiosRequestConfig
}

export interface PutParams<D = any> {
  url: string
  data?: D
  config?: AxiosRequestConfig
}

export interface PatchParams<D = any> {
  url: string
  data?: D
  config?: AxiosRequestConfig
}