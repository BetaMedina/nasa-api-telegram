"use strict";
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
    async handle(httpRequest) {
        try {
            const { body: { message } } = httpRequest;
            if (message.text === payload_enum_1.TELEGRAM_ENUM.CLIENT_MESSAGE) {
                const feedToday = await this.feed.getFeedToday();
                if (!feedToday.length) {
                    await this.sendToTelegram.sendToTelegram({
                        payload: [payload_enum_1.TELEGRAM_ENUM.EMPTY_MESSAGE],
                        chatId: message.chat.id
                    });
                    return _1.success('Message has been send');
                }
                const nasaFormatted = await this.formatToTelegram.format(feedToday);
                await this.sendToTelegram.sendToTelegram({ payload: nasaFormatted, chatId: message.chat.id });
                return _1.success('Message has been send');
            }
            await this.sendToTelegram.sendToTelegram({
                payload: [payload_enum_1.TELEGRAM_ENUM.ERROR_MESSAGE],
                chatId: message.chat.id
            });
            return _1.success('Message has been send');
        }
        catch (err) {
            return _1.serverError(err);
        }
    }
}
exports.GetFeedTodayController = GetFeedTodayController;
//# sourceMappingURL=get-feed-controller.js.map