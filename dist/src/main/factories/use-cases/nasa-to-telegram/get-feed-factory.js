"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFeedFactory = void 0;
const axios_adapter_1 = require("../../../../infra/adapters/axios/axios-adapter");
const get_feed_today_1 = require("../../../../data/use-cases/nasa-feed/get-feed-today");
const GetFeedFactory = () => {
    const request = new axios_adapter_1.AxiosAdapter();
    return new get_feed_today_1.GetFeedToday(request);
};
exports.GetFeedFactory = GetFeedFactory;
//# sourceMappingURL=get-feed-factory.js.map