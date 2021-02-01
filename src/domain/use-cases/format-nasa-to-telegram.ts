import { INasaEntity } from '../entitys/nasa-entity'

export type IFormatNasaToTelegram = {
  format:(data:INasaEntity[])=>Promise<Array<String>>
}
