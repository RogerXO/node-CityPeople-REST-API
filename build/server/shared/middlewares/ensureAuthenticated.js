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
    if (token !== "teste.teste.teste") {
        return services_1.utils.unauthorizedErrorResponse(res);
    }
    return next();
};
exports.ensureAuthenticated = ensureAuthenticated;
