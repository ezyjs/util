import type { InternalAxiosRequestConfig } from 'axios'
import type { Interceptor } from "../interface";

/**
 * RequestInterceptor
 * @desc 요청 인터셉터 모델
 */
export class RequestInterceptorModel implements Interceptor {
  constructor(
    public id: string,
    public priority: number,
    public onFulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    public onRejected?: (error: any) => any
  ) { }
}