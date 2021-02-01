"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(error) {
        super(`Error: ${error}`);
        this.name = 'BadRequestError';
        this.type = 'badRequest';
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request.js.map