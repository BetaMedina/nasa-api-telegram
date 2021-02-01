"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatNasaToTelegram = void 0;
class FormatNasaToTelegram {
    format(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return data.map(commet => {
                return `O Asteroide ${commet.name} passará hoje na distancia (km/h): ${commet.close_approach_data[0].miss_distance.kilometers}\n a uma velocidade relativa de ${commet.close_approach_data[0].relative_velocity.kilometers_per_second}km/h e com um diâmetro minimo de: ${commet.estimated_diameter.kilometers.estimated_diameter_min}km/h e maximo ${commet.estimated_diameter.kilometers.estimated_diameter_max}km/h`;
            });
        });
    }
}
exports.FormatNasaToTelegram = FormatNasaToTelegram;
//# sourceMappingURL=format-to-send-to-telegram.js.map