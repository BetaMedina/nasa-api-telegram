"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
class AxiosAdapter {
    async get(url, headers) {
        return axios_1.default.get(url, headers);
    }
    async post(url, payload, headers) {
        return axios_1.default.post(url, payload, headers);
    }
}
exports.AxiosAdapter = AxiosAdapter;
//# sourceMappingURL=axios-adapter.js.map