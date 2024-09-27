import type { AxiosResponse } from 'axios'
import type { Interceptor } from "../interface";

/**
 * ResponseInterceptor
 * @desc 응답 인터셉터 모델
 */
export class ResponseInterceptorModel implements Interceptor {
  constructor(
    public id: string,
    public priority: number,
    public onFulfilled: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    public onRejected?: (error: any) => any
  ) { }
}