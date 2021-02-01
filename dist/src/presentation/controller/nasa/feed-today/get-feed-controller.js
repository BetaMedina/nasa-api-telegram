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
exports.GetFeedTodayController = void 0;
const _1 = require("./");
const payload_enum_1 = require("./enum/payload.enum");
class GetFeedTodayController {
    constructor(feed, formatToTelegram, sendToTelegram) {
        this.feed = feed;
        this.formatToTelegram = formatToTelegram;
        this.sendToTelegram = sendToTelegram;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { message } } = httpRequest;
                if (message.text === payload_enum_1.TELEGRAM_ENUM.CLIENT_MESSAGE) {
                    const feedToday = yield this.feed.getFeedToday();
                    if (!feedToday.length) {
                        yield this.sendToTelegram.sendToTelegram({
                            payload: [payload_enum_1.TELEGRAM_ENUM.EMPTY_MESSAGE],
                            chatId: message.chat.id
                        });
                        return _1.success('Message has been send');
                    }
                    const nasaFormatted = yield this.formatToTelegram.format(feedToday);
                    yield this.sendToTelegram.sendToTelegram({ payload: nasaFormatted, chatId: message.chat.id });
                    return _1.success('Message has been send');
                }
                yield this.sendToTelegram.sendToTelegram({
                    payload: [payload_enum_1.TELEGRAM_ENUM.ERROR_MESSAGE],
                    chatId: message.chat.id
                });
                return _1.success('Message has been send');
            }
            catch (err) {
                return _1.serverError(err);
            }
        });
    }
}
exports.GetFeedTodayController = GetFeedTodayController;
//# sourceMappingURL=get-feed-controller.js.map