"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostToTelegramFactory = void 0;
const axios_adapter_1 = require("@/infra/adapters/axios/axios-adapter");
const send_to_telegram_1 = require("@/data/use-cases/nasa-feed/send-to-telegram");
const PostToTelegramFactory = () => {
    const request = new axios_adapter_1.AxiosAdapter();
    return new send_to_telegram_1.SendToTelegram(request);
};
exports.PostToTelegramFactory = PostToTelegramFactory;
//# sourceMappingURL=post-to-telegram.js.map