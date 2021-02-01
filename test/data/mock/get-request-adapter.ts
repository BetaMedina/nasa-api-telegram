import faker from 'faker'
import { IGetRequestAdapter } from '../contract/request-adapter/get-request-adapter'

export class MakeRequestAdapterStub implements IGetRequestAdapter {
  nasaUrl:String
  killometersDiametersMin:Number
  killometersDiametersMax:Number
  relativeVelocityKm:String
  estimatedDiameterMin:Number
  estimatedDiameterMax:Number
  name:String
  date:string
  
  async get (url: string, headers?: object):Promise<IGetRequestAdapter.result> {
    this.date = new Date().toISOString().split('T')[0]
    this.nasaUrl = faker.internet.url()
    this.killometersDiametersMax = faker.random.number(99999)
    this.killometersDiametersMin = faker.random.number(999)
    this.relativeVelocityKm = String(faker.random.number(9999))
    this.estimatedDiameterMin = faker.random.number(999)
    this.estimatedDiameterMax = faker.random.number(9999)
    this.name = faker.internet.userName()
    return {
      data: {
        element_count: faker.random.number(10),
        near_earth_objects: {
          [this.date]: [{
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
              estimated_diameter_min: this.estimatedDiameterMin,
              estimated_diameter_max: this.estimatedDiameterMax
            } 
          }]
        }
      },
      status: 200
    }
  }
}
