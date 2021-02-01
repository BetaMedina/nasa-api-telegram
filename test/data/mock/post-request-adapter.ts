import { IGetRequestAdapter } from '../contract/request-adapter/get-request-adapter'
import { IPostRequestAdapter } from '../contract/request-adapter/post-request-adapter'

export class IRequestPostAdapter implements IPostRequestAdapter {
  async post (url: string, payload:any, headers?: object):Promise<IGetRequestAdapter.result> {
    return {
      data: {},
      status: 200
    }
  }
}
