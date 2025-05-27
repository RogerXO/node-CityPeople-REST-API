"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateByIdValidation = void 0;
exports.updateById = updateById;
const middlewares_1 = require("../../shared/middlewares");
const yup = __importStar(require("yup"));
const people_1 = require("../../database/providers/people");
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../shared/services");
const paramsValidation = yup
    .object()
    .shape({
    id: yup.number().integer().required().moreThan(0),
});
const bodyValidation = yup
    .object()
    .shape({
    fullName: yup.string().required().min(2),
    email: yup.string().required().email(),
    cityId: yup.number().integer().moreThan(0).required(),
});
exports.updateByIdValidation = (0, middlewares_1.validation)({
    params: paramsValidation,
    body: bodyValidation,
});
async function updateById(req, res) {
    const id = req.params.id;
    const body = req.body;
    if (!id) {
        return services_1.utils.paramsIdIsRequiredErrorResponse(res);
    }
    const result = await people_1.peopleProvider.updateById(id, body);
    if (result instanceof Error) {
        return services_1.utils.internalServerErrorResponse(res, result.message);
    }
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
}
