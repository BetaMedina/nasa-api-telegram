"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_router_adapter_1 = require("../../adapters/express-router-adapter");
const account_factory_1 = require("../../../main/factories/controllers/feed-today/account-factory");
exports.default = (route) => {
    route.post('/telegram', express_router_adapter_1.adaptRoute(account_factory_1.makeFeedTodayController()));
};
//# sourceMappingURL=telegram-routes.js.map