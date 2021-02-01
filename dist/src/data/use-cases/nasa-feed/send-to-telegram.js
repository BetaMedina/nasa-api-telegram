"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendToTelegram = void 0;
const bad_request_1 = require("../../../presentation/errors/bad-request");
const nasa_feed_enum_1 = require("./enum/nasa-feed.enum");
class SendToTelegram {
    constructor(requestAdapter) {
        this.requestAdapter = requestAdapter;
    }
    async sendToTelegram(payload) {
        const response = await this.requestAdapter.post(nasa_feed_enum_1.NASA_FEED.LAMBDA_URL, {
            nasaData: payload.payload,
            chatId: payload.chatId
        });
        if (response.status !== 200) {
            throw new bad_request_1.BadRequestError(`Lambda return status ${response.status}`);
        }
    }
}
exports.SendToTelegram = SendToTelegram;
//# sourceMappingURL=send-to-telegram.js.map