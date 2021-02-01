"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_feed_controller_1 = require("../../../../src/presentation/controller/nasa/feed-today/get-feed-controller");
const helper_1 = require("../../../../src/presentation/helper");
const format_nasa_to_telegram_1 = require("../../mock/use-cases/format-nasa-to-telegram");
const request_feed_1 = require("../../mock/use-cases/request-feed");
const send_to_telegram_1 = require("../../mock/use-cases/send-to-telegram");
const payload_enum_1 = require("../../../../src/presentation/controller/nasa/feed-today/enum/payload.enum");
const faker_1 = __importDefault(require("faker"));
const makeSut = () => {
    const requestSut = new request_feed_1.MakeRequestStub();
    const formatNasaToTelegramSut = new format_nasa_to_telegram_1.FormatNasaToTelegramStub();
    const sendToTelegramSut = new send_to_telegram_1.SendToTelegramStub();
    const sut = new get_feed_controller_1.GetFeedTodayController(requestSut, formatNasaToTelegramSut, sendToTelegramSut);
    return { sut, requestSut, formatNasaToTelegramSut, sendToTelegramSut };
};
let makePayload;
describe('GetFeedTodayController', () => {
    makePayload = {
        body: {
            message: {
                chat: { id: String(faker_1.default.random.number(128311)) },
                text: payload_enum_1.TELEGRAM_ENUM.CLIENT_MESSAGE
            }
        }
    };
    it('Should be return an error when the API response is different than 200', async () => {
        const { requestSut, sendToTelegramSut, sut } = makeSut();
        jest.spyOn(requestSut, 'getFeedToday').mockReturnValueOnce(Promise.resolve([]));
        const params = jest.spyOn(sendToTelegramSut, 'sendToTelegram');
        const httpResponse = await sut.handle(makePayload);
        const telegramParams = {
            chatId: makePayload.body.message.chat.id,
            payload: [
                payload_enum_1.TELEGRAM_ENUM.EMPTY_MESSAGE
            ]
        };
        expect(params).toHaveBeenCalledWith(telegramParams);
        expect(httpResponse).toEqual(helper_1.success('Message has been send'));
    });
    it("should format the api's response to a text", async () => {
        const { requestSut, formatNasaToTelegramSut, sut } = makeSut();
        const params = jest.spyOn(formatNasaToTelegramSut, 'format');
        await sut.handle(makePayload);
        const nasaApiResponse = [{
                name: requestSut.name,
                close_approach_data: {
                    miss_distance: {
                        kilometers: requestSut.relativeVelocityKm
                    }
                },
                relative_velocity: {
                    kilometers_per_second: requestSut.relativeVelocityKm
                },
                estimated_diameter: {
                    kilometers: {
                        estimated_diameter_min: requestSut.estimatedDiameterMin,
                        estimated_diameter_max: requestSut.estimatedDiameterMax
                    }
                }
            }];
        expect(params).toHaveBeenCalledWith(nasaApiResponse);
    });
    it('should expected to call senTelegram with error message', async () => {
        const { sendToTelegramSut, sut } = makeSut();
        const params = jest.spyOn(sendToTelegramSut, 'sendToTelegram');
        await sut.handle({
            body: {
                message: {
                    chat: { id: makePayload.body.message.chat.id },
                    text: 'Olá'
                }
            }
        });
        const telegramParams = {
            chatId: makePayload.body.message.chat.id,
            payload: [
                payload_enum_1.TELEGRAM_ENUM.ERROR_MESSAGE
            ]
        };
        expect(params).toHaveBeenCalledWith(telegramParams);
    });
    it('expected to call telegramApi and send meteor information', async () => {
        const { sendToTelegramSut, formatNasaToTelegramSut, sut } = makeSut();
        const params = jest.spyOn(sendToTelegramSut, 'sendToTelegram');
        await sut.handle(makePayload);
        const telegramParams = {
            chatId: makePayload.body.message.chat.id,
            payload: [
                `O Asteroide ${formatNasaToTelegramSut.name} passará hoje na distancia minima(km/h): ${formatNasaToTelegramSut.killometersDiametersMin} e maxima(km/h): ${formatNasaToTelegramSut.killometersDiametersMax}\n
      a uma velocidade relativa de ${formatNasaToTelegramSut.relativeVelocityKm} e com um diâmetro minimo de: ${formatNasaToTelegramSut.estimatedDiameterMin} e maximo ${formatNasaToTelegramSut.estimatedDiameterMax}`
            ]
        };
        expect(telegramParams.chatId).toEqual(sendToTelegramSut.chatId);
        expect(telegramParams.payload).toEqual(sendToTelegramSut.payload);
        expect(params).toHaveBeenCalledWith(telegramParams);
    });
    it('expected to return 500 when sendToTelegram throws', async () => {
        const { sendToTelegramSut, sut } = makeSut();
        jest.spyOn(sendToTelegramSut, 'sendToTelegram').mockImplementationOnce(() => { throw new Error('validError'); });
        const httpResponse = await sut.handle(makePayload);
        expect(httpResponse).toEqual(helper_1.serverError(new Error('validError')));
    });
    it('expected to return 500 when requestSut throws', async () => {
        const { requestSut, sut } = makeSut();
        jest.spyOn(requestSut, 'getFeedToday').mockImplementationOnce(() => { throw new Error('validError'); });
        const httpResponse = await sut.handle(makePayload);
        expect(httpResponse).toEqual(helper_1.serverError(new Error('validError')));
    });
    it('expected to return 500 when requestSut throws', async () => {
        const { sendToTelegramSut, sut } = makeSut();
        jest.spyOn(sendToTelegramSut, 'sendToTelegram').mockImplementationOnce(() => { throw new Error('validError'); });
        const httpResponse = await sut.handle(makePayload);
        expect(httpResponse).toEqual(helper_1.serverError(new Error('validError')));
    });
    it('Should expected return success', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makePayload);
        expect(httpResponse).toEqual(helper_1.success('Message has been send'));
    });
});
//# sourceMappingURL=get-feed-controller.spec.js.map