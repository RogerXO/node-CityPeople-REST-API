import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const defaultLimit = 10;
export const defaultPage = 1;

export function internalServerErrorResponse(res: Response, error: Error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: error.message,
    },
  });
}

export function paramsIdIsRequiredErrorResponse(res: Response) {
  return res.status(StatusCodes.BAD_REQUEST).json({
    errors: {
      default: "O parâmetro 'id' precisa ser informado",
    },
  });
}
