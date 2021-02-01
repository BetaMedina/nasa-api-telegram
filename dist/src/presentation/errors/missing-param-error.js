"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
class MissingParamError extends Error {
    constructor(paramName) {
        super(`Missing param: ${paramName}`);
        this.name = 'MissingParamError';
        this.message = `Missing param: ${paramName}`;
    }
}
exports.MissingParamError = MissingParamError;
//# sourceMappingURL=missing-param-error.js.map