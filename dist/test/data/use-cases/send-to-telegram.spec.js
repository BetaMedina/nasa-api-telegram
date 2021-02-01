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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_to_telegram_1 = require("@/data/use-cases/nasa-feed/send-to-telegram");
const post_request_adapter_1 = require("../mock/post-request-adapter");
const faker_1 = __importDefault(require("faker"));
const nasa_feed_enum_1 = require("@/data/use-cases/nasa-feed/enum/nasa-feed.enum");
const makeSut = () => {
    const requestAdapterStub = new post_request_adapter_1.IRequestPostAdapter();
    const sut = new send_to_telegram_1.SendToTelegram(requestAdapterStub);
    return {
        requestAdapterStub,
        sut
    };
};
let makePayload;
describe('Send to telegram', () => {
    beforeEach(() => {
        makePayload = {
            payload: [],
            chatId: faker_1.default.random.number(10)
        };
    });
    it('Should expected to call post adapter with correct parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const { requestAdapterStub, sut } = makeSut();
        const params = jest.spyOn(requestAdapterStub, 'post');
        yield sut.sendToTelegram(makePayload);
        expect(params).toHaveBeenCalledWith(nasa_feed_enum_1.NASA_FEED.LAMBDA_URL, {
            nasaData: makePayload.payload,
            chatId: makePayload.chatId
        });
    }));
    it('Should expected to throw when post return status !== 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { requestAdapterStub, sut } = makeSut();
        jest.spyOn(requestAdapterStub, 'post').mockImplementationOnce(() => {
            throw new Error('validError');
        });
        expect(sut.sendToTelegram(makePayload)).rejects.toThrowError('validError');
    }));
});
//# sourceMappingURL=send-to-telegram.spec.js.map