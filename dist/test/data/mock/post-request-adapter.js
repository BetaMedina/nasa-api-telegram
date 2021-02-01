"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRequestPostAdapter = void 0;
class IRequestPostAdapter {
    async post(url, payload, headers) {
        return {
            data: {},
            status: 200
        };
    }
}
exports.IRequestPostAdapter = IRequestPostAdapter;
//# sourceMappingURL=post-request-adapter.js.map