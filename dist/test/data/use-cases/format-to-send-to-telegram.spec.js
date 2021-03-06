"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const format_to_send_to_telegram_1 = require("../../../src/data/use-cases/nasa-feed/format-to-send-to-telegram");
const makeSut = () => {
    const sut = new format_to_send_to_telegram_1.FormatNasaToTelegram();
    return { sut };
};
let makePayload;
describe('Format to send to telegram', () => {
    beforeEach(() => {
        makePayload = [{
                name: faker_1.default.internet.userName(),
                close_approach_data: [{
                        miss_distance: {
                            kilometers: faker_1.default.random.number(99999)
                        },
                        relative_velocity: {
                            kilometers_per_second: faker_1.default.random.number(99999)
                        }
                    }],
                estimated_diameter: {
                    kilometers: {
                        estimated_diameter_min: faker_1.default.random.number(999),
                        estimated_diameter_max: faker_1.default.random.number(99999)
                    }
                }
            }];
    });
    it('Expected to map correct array and return arrayObject', async () => {
        const { sut } = makeSut();
        const response = await sut.format(makePayload);
        expect(response).toEqual([
            `O Asteroide ${makePayload[0].name} passará hoje na distancia (km/h): ${makePayload[0].close_approach_data[0].miss_distance.kilometers}\n a uma velocidade relativa de ${makePayload[0].close_approach_data[0].relative_velocity.kilometers_per_second}km/h e com um diâmetro minimo de: ${makePayload[0].estimated_diameter.kilometers.estimated_diameter_min}km/h e maximo ${makePayload[0].estimated_diameter.kilometers.estimated_diameter_max}km/h`
        ]);
    });
});
//# sourceMappingURL=format-to-send-to-telegram.spec.js.map