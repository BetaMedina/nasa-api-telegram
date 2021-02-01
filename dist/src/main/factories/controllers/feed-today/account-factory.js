"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFeedTodayController = void 0;
const get_feed_controller_1 = require("@/presentation/controller/nasa/feed-today/get-feed-controller");
const get_feed_factory_1 = require("@/main/factories/use-cases/nasa-to-telegram/get-feed-factory");
const format_to_send_to_telegram_1 = require("@/data/use-cases/nasa-feed/format-to-send-to-telegram");
const post_to_telegram_1 = require("@/main/factories/use-cases/nasa-to-telegram/post-to-telegram");
const makeFeedTodayController = () => {
    const formatToTelegram = new format_to_send_to_telegram_1.FormatNasaToTelegram();
    return new get_feed_controller_1.GetFeedTodayController(get_feed_factory_1.GetFeedFactory(), formatToTelegram, post_to_telegram_1.PostToTelegramFactory());
};
exports.makeFeedTodayController = makeFeedTodayController;
//# sourceMappingURL=account-factory.js.map