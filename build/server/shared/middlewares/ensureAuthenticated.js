"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const services_1 = require("../services");
const ensureAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return services_1.utils.unauthorizedErrorResponse(res);
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
        return services_1.utils.unauthorizedErrorResponse(res);
    }
    const jwtData = services_1.JWTService.verify(token);
    if (jwtData === "JWT_SECRET_NOT_FOUND") {
        return services_1.utils.internalServerErrorResponse(res, "Erro ao verificiar o token");
    }
    if (jwtData === "INVALID_TOKEN") {
        return services_1.utils.unauthorizedErrorResponse(res);
    }
    req.headers.userId = jwtData.uid.toString();
    return next();
};
exports.ensureAuthenticated = ensureAuthenticated;
