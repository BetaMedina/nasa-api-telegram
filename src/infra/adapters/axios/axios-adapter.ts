import { IGetRequestAdapter } from '../../../data/contract/request-adapter/get-request-adapter'
import { IPostRequestAdapter } from '../../../data/contract/request-adapter/post-request-adapter'
import axios from 'axios'

export class AxiosAdapter implements IGetRequestAdapter, IPostRequestAdapter {
  async get (url:string, headers?:object): Promise<IGetRequestAdapter.result> {
    return axios.get(url, headers)
  }

  async post (url:string, payload:any, headers?:object): Promise<IPostRequestAdapter.result> {
    return axios.post(url, payload, headers)
  }
}
