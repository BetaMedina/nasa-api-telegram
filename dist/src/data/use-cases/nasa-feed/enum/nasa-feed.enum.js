"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NASA_FEED = void 0;
require("dotenv");
exports.NASA_FEED = {
    ENDPOINT_API: `https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${process.env.NASA_API_KEY}`,
    LAMBDA_URL: process.env.LAMBDA_URL
};
//# sourceMappingURL=nasa-feed.enum.js.map