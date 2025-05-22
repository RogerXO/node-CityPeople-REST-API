import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const defaultLimit = 10;
export const defaultPage = 1;

function defaultError(errorMessage: string) {
  return {
    errors: {
      default: errorMessage,
    },
  };
}

export function internalServerErrorResponse(
  res: Response,
  errorMessage: string
) {
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(defaultError(errorMessage));
}

export function paramsIdIsRequiredErrorResponse(res: Response) {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json(defaultError("O parâmetro 'id' precisa ser informado"));
}

export function unauthorizedErrorResponse(res: Response) {
  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json(defaultError("Email ou senha são inválidos"));
}
