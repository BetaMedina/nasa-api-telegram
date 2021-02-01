"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeRequestAdapterStub = void 0;
const faker_1 = __importDefault(require("faker"));
class MakeRequestAdapterStub {
    async get(url, headers) {
        this.date = new Date().toISOString().split('T')[0];
        this.nasaUrl = faker_1.default.internet.url();
        this.killometersDiametersMax = faker_1.default.random.number(99999);
        this.killometersDiametersMin = faker_1.default.random.number(999);
        this.relativeVelocityKm = String(faker_1.default.random.number(9999));
        this.estimatedDiameterMin = faker_1.default.random.number(999);
        this.estimatedDiameterMax = faker_1.default.random.number(9999);
        this.name = faker_1.default.internet.userName();
        return {
            data: {
                element_count: faker_1.default.random.number(10),
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
        };
    }
}
exports.MakeRequestAdapterStub = MakeRequestAdapterStub;
//# sourceMappingURL=get-request-adapter.js.map