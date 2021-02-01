"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.success = exports.badRequest = exports.serverError = void 0;
const serverError = (error) => ({
    statusCode: 500,
    data: error.message
});
exports.serverError = serverError;
const badRequest = (error) => ({
    statusCode: 400,
    data: error.message
});
exports.badRequest = badRequest;
const success = (data) => ({
    statusCode: 200,
    data
});
exports.success = success;
const empty = () => ({
    statusCode: 204,
    data: 'EmptyResponse'
});
exports.empty = empty;
//# sourceMappingURL=http.js.map