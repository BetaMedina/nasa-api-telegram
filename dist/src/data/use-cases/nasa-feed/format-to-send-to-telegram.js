"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatNasaToTelegram = void 0;
class FormatNasaToTelegram {
    async format(data) {
        return data.map(commet => {
            return `O Asteroide ${commet.name} passará hoje na distancia (km/h): ${commet.close_approach_data[0].miss_distance.kilometers}\n a uma velocidade relativa de ${commet.close_approach_data[0].relative_velocity.kilometers_per_second}km/h e com um diâmetro minimo de: ${commet.estimated_diameter.kilometers.estimated_diameter_min}km/h e maximo ${commet.estimated_diameter.kilometers.estimated_diameter_max}km/h`;
        });
    }
}
exports.FormatNasaToTelegram = FormatNasaToTelegram;
//# sourceMappingURL=format-to-send-to-telegram.js.map