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
exports.signInValidation = void 0;
exports.signIn = signIn;
const yup = __importStar(require("yup"));
const middlewares_1 = require("../../shared/middlewares");
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../shared/services");
const users_1 = require("../../database/providers/users");
const bodyValidation = yup
    .object()
    .shape({
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(6),
});
exports.signInValidation = (0, middlewares_1.validation)({
    body: bodyValidation,
});
async function signIn(req, res) {
    const { email, password } = req.body;
    const user = await users_1.usersProvider.getByEmail(email);
    if (user instanceof Error) {
        return services_1.utils.loginErrorResponse(res);
    }
    const passwordMatch = await services_1.passwordCrypto.verifyPassword(password, user.password);
    if (!passwordMatch) {
        return services_1.utils.loginErrorResponse(res);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ accessToken: "teste.teste.teste" });
}
