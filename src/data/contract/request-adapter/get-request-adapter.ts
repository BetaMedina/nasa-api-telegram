export type IGetRequestAdapter = {
  get:(url:string, headers?:object)=>Promise<IGetRequestAdapter.result>
}

export namespace IGetRequestAdapter {
  export type result = {
    data:any
    status:Number
  }
}
