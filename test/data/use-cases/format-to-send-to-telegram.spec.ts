import faker from 'faker'
import { FormatNasaToTelegram } from '@/data/use-cases/nasa-feed/format-to-send-to-telegram'

const makeSut = () => {
  const sut = new FormatNasaToTelegram()
  return { sut }
}

let makePayload
describe('Format to send to telegram', () => {
  beforeEach(() => {
    makePayload = [{
      name: faker.internet.userName(),
      close_approach_data: {
        miss_distance: {
          kilometers: faker.random.number(99999)
        }
      },
      relative_velocity: {
        kilometers_per_second: faker.random.number(99999)
      },
      estimated_diameter: {
        estimated_diameter_min: faker.random.number(999),
        estimated_diameter_max: faker.random.number(99999)
      } 
    }]
  })
  it('Expected to map correct array and return arrayObject', async () => {
    const { sut } = makeSut()
 
    const response = await sut.format(makePayload)

    expect(response).toEqual([
      `O Asteroide ${makePayload[0].name} passará hoje na distancia (km/h): ${makePayload[0].close_approach_data.miss_distance.kilometers}\n
      a uma velocidade relativa de ${makePayload[0].relative_velocity.kilometers_per_second}km/h e com um diâmetro minimo de: ${makePayload[0].estimated_diameter.estimated_diameter_min}km/h e maximo ${makePayload[0].estimated_diameter.estimated_diameter_max}km/h`
    ])
  })
})
