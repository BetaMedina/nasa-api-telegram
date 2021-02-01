"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFeedToday = void 0;
const nasa_feed_enum_1 = require("./enum/nasa-feed.enum");
class GetFeedToday {
    constructor(requestAdapter) {
        this.requestAdapter = requestAdapter;
    }
    async getFeedToday() {
        const feedToday = await this.requestAdapter.get(nasa_feed_enum_1.NASA_FEED.ENDPOINT_API);
        if (feedToday.data.element_count) {
            const dateNow = new Date().toISOString().split('T')[0];
            return feedToday.data.near_earth_objects[dateNow];
        }
        return [];
    }
}
exports.GetFeedToday = GetFeedToday;
//# sourceMappingURL=get-feed-today.js.map