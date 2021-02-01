import { INasaEntity } from '../../../../src/domain/entitys/nasa-entity'
import { IFormatNasaToTelegram } from '../../../../src/domain/use-cases/format-nasa-to-telegram'
import faker from 'faker'

export class FormatNasaToTelegramStub implements IFormatNasaToTelegram {
  nasaUrl:String
  killometersDiametersMin:Number
  killometersDiametersMax:Number
  relativeVelocityKm:String
  estimatedDiameterMin:Number
  estimatedDiameterMax:Number
  name:String
  
  async format (payload:INasaEntity[]):Promise<Array<String>> {
    this.nasaUrl = faker.internet.url()
    this.killometersDiametersMax = faker.random.number(99999)
    this.killometersDiametersMin = faker.random.number(999)
    this.relativeVelocityKm = String(faker.random.number(9999))
    this.estimatedDiameterMin = faker.random.number(999)
    this.estimatedDiameterMax = faker.random.number(9999)
    this.name = faker.internet.userName()
    return [
      `O Asteroide ${this.name} passará hoje na distancia minima(km/h): ${this.killometersDiametersMin} e maxima(km/h): ${this.killometersDiametersMax}\n
      a uma velocidade relativa de ${this.relativeVelocityKm} e com um diâmetro minimo de: ${this.estimatedDiameterMin} e maximo ${this.estimatedDiameterMax}`
    ]
  }
}
