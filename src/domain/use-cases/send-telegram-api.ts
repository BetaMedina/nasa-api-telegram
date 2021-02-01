export interface ISendToTelegram {
  sendToTelegram:(payload:ISendToTelegram.payload)=>Promise<void>
}

export namespace ISendToTelegram {
  export type payload = {
    payload:Array<String>,
    chatId:String
  }
}
