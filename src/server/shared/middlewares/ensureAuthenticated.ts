import { RequestHandler } from "express";
import { utils } from "../services";

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return utils.unauthorizedErrorResponse(res);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return utils.unauthorizedErrorResponse(res);
  }

  if (token !== "teste.teste.teste") {
    return utils.unauthorizedErrorResponse(res);
  }

  return next();
};
