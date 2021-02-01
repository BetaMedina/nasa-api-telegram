"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const httpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers
        };
        const httpResponse = yield controller.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            return res.status(httpResponse.statusCode).json(httpResponse.data);
        }
        return res.status(httpResponse.statusCode).json({ error: httpResponse.data });
    });
};
exports.adaptRoute = adaptRoute;
//# sourceMappingURL=express-router-adapter.js.map