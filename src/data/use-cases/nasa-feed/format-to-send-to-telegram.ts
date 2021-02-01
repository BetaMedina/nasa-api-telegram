import { INasaEntity } from '../../../domain/entitys/nasa-entity'
import { IFormatNasaToTelegram } from '../../../domain/use-cases/format-nasa-to-telegram'

export class FormatNasaToTelegram implements IFormatNasaToTelegram {
  async format (data:INasaEntity[]):Promise<String[]> {
    return data.map(commet => {
      return `O Asteroide ${commet.name} passará hoje na distancia (km/h): ${commet.close_approach_data[0].miss_distance.kilometers}\n a uma velocidade relativa de ${commet.close_approach_data[0].relative_velocity.kilometers_per_second}km/h e com um diâmetro minimo de: ${commet.estimated_diameter.kilometers.estimated_diameter_min}km/h e maximo ${commet.estimated_diameter.kilometers.estimated_diameter_max}km/h`
    })
  }
}
