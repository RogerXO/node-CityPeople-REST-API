import { RequestHandler } from "express";
import { JWTService, utils } from "../services";

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return utils.unauthorizedErrorResponse(res);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return utils.unauthorizedErrorResponse(res);
  }

  const jwtData = JWTService.verify(token);

  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return utils.internalServerErrorResponse(res, "Erro ao verificiar o token");
  }

  if (jwtData === "INVALID_TOKEN") {
    return utils.unauthorizedErrorResponse(res);
  }

  req.headers.userId = jwtData.uid.toString();

  return next();
};
