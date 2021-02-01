"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatNasaToTelegramStub = void 0;
const faker_1 = __importDefault(require("faker"));
class FormatNasaToTelegramStub {
    async format(payload) {
        this.nasaUrl = faker_1.default.internet.url();
        this.killometersDiametersMax = faker_1.default.random.number(99999);
        this.killometersDiametersMin = faker_1.default.random.number(999);
        this.relativeVelocityKm = String(faker_1.default.random.number(9999));
        this.estimatedDiameterMin = faker_1.default.random.number(999);
        this.estimatedDiameterMax = faker_1.default.random.number(9999);
        this.name = faker_1.default.internet.userName();
        return [
            `O Asteroide ${this.name} passará hoje na distancia minima(km/h): ${this.killometersDiametersMin} e maxima(km/h): ${this.killometersDiametersMax}\n
      a uma velocidade relativa de ${this.relativeVelocityKm} e com um diâmetro minimo de: ${this.estimatedDiameterMin} e maximo ${this.estimatedDiameterMax}`
        ];
    }
}
exports.FormatNasaToTelegramStub = FormatNasaToTelegramStub;
//# sourceMappingURL=format-nasa-to-telegram.js.map