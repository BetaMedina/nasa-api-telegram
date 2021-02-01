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
exports.SendToTelegram = void 0;
const bad_request_1 = require("@/presentation/errors/bad-request");
const nasa_feed_enum_1 = require("./enum/nasa-feed.enum");
class SendToTelegram {
    constructor(requestAdapter) {
        this.requestAdapter = requestAdapter;
    }
    sendToTelegram(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.requestAdapter.post(nasa_feed_enum_1.NASA_FEED.LAMBDA_URL, {
                nasaData: payload.payload,
                chatId: payload.chatId
            });
            if (response.status !== 200) {
                throw new bad_request_1.BadRequestError(`Lambda return status ${response.status}`);
            }
        });
    }
}
exports.SendToTelegram = SendToTelegram;
//# sourceMappingURL=send-to-telegram.js.map