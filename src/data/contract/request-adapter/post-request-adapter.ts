export type IPostRequestAdapter = {
  post:(url:string, payload:any, headers?:object)=>Promise<IPostRequestAdapter.result>
}

export namespace IPostRequestAdapter {
  export type result = {
    data:any
    status:Number
  }
}
