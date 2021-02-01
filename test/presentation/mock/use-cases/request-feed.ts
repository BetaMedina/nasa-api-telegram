import { INasaEntity } from '@/domain/entitys/nasa-entity'
import { IRequestFeed } from '@/domain/use-cases/request-feed'
import faker from 'faker'

export class MakeRequestStub implements IRequestFeed {
  nasaUrl:String
  killometersDiametersMin:Number
  killometersDiametersMax:Number
  relativeVelocityKm:String
  estimatedDiameterMin:Number
  estimatedDiameterMax:Number
  name:String
  date:string
  
  async getFeedToday ():Promise<INasaEntity[]> {
    this.date = new Date().toISOString().split('T')[0]
    this.nasaUrl = faker.internet.url()
    this.killometersDiametersMax = faker.random.number(99999)
    this.killometersDiametersMin = faker.random.number(999)
    this.relativeVelocityKm = String(faker.random.number(9999))
    this.estimatedDiameterMin = faker.random.number(999)
    this.estimatedDiameterMax = faker.random.number(9999)
    this.name = faker.internet.userName()
    return [{
      name: this.name,
      close_approach_data: {
        miss_distance: {
          kilometers: this.relativeVelocityKm
        }
      },
      relative_velocity: {
        kilometers_per_second: this.relativeVelocityKm
      },
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: this.estimatedDiameterMin,
          estimated_diameter_max: this.estimatedDiameterMax
        }
      } 
    }]
  }
}
