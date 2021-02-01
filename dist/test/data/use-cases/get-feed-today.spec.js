"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_feed_today_1 = require("../../../src/data/use-cases/nasa-feed/get-feed-today");
const get_request_adapter_1 = require("../mock/get-request-adapter");
const makeSut = () => {
    const requestAdapterSut = new get_request_adapter_1.MakeRequestAdapterStub();
    const sut = new get_feed_today_1.GetFeedToday(requestAdapterSut);
    return { sut, requestAdapterSut };
};
describe('Get feed today', () => {
    it('Should expected return empty array when nasa api return empty', async () => {
        const { requestAdapterSut, sut } = makeSut();
        jest.spyOn(requestAdapterSut, 'get').mockReturnValueOnce(Promise.resolve({ data: {}, status: 204 }));
        const response = await sut.getFeedToday();
        expect(response).toEqual([]);
    });
    it('expected to return today array with correct parameters', async () => {
        const { requestAdapterSut, sut } = makeSut();
        const response = await sut.getFeedToday();
        expect(response).toEqual([{
                name: requestAdapterSut.name,
                close_approach_data: {
                    miss_distance: {
                        kilometers: requestAdapterSut.relativeVelocityKm
                    }
                },
                relative_velocity: {
                    kilometers_per_second: requestAdapterSut.relativeVelocityKm
                },
                estimated_diameter: {
                    estimated_diameter_min: requestAdapterSut.estimatedDiameterMin,
                    estimated_diameter_max: requestAdapterSut.estimatedDiameterMax
                }
            }]);
    });
});
//# sourceMappingURL=get-feed-today.spec.js.map