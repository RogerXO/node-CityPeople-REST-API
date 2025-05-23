"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPage = exports.defaultLimit = void 0;
exports.internalServerErrorResponse = internalServerErrorResponse;
exports.paramsIdIsRequiredErrorResponse = paramsIdIsRequiredErrorResponse;
exports.unauthorizedErrorResponse = unauthorizedErrorResponse;
const http_status_codes_1 = require("http-status-codes");
exports.defaultLimit = 10;
exports.defaultPage = 1;
function defaultError(errorMessage) {
    return {
        errors: {
            default: errorMessage,
        },
    };
}
function internalServerErrorResponse(res, errorMessage) {
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(defaultError(errorMessage));
}
function paramsIdIsRequiredErrorResponse(res) {
    return res
        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
        .json(defaultError("O parâmetro 'id' precisa ser informado"));
}
function unauthorizedErrorResponse(res) {
    return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json(defaultError("Email ou senha são inválidos"));
}
