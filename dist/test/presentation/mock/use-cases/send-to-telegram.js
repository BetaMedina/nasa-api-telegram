"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendToTelegramStub = void 0;
class SendToTelegramStub {
    async sendToTelegram(payload) {
        this.payload = payload.payload;
        this.chatId = payload.chatId;
    }
}
exports.SendToTelegramStub = SendToTelegramStub;
//# sourceMappingURL=send-to-telegram.js.map