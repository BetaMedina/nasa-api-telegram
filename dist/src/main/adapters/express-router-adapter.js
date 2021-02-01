"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            return res.status(httpResponse.statusCode).json(httpResponse.data);
        }
        return res.status(httpResponse.statusCode).json({ error: httpResponse.data });
    };
};
exports.adaptRoute = adaptRoute;
//# sourceMappingURL=express-router-adapter.js.map