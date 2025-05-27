import { Request, Response } from "express";
import { ICityCreateBodyProps } from "../../shared/types/cities";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { citiesProvider } from "../../database/providers/cities";
import { utils } from "../../shared/services";

const bodyValidation: yup.ObjectSchema<ICityCreateBodyProps> = yup
  .object()
  .shape({
    name: yup.string().required().min(3).max(60),
  });

export const createValidation = validation({
  body: bodyValidation,
});

export async function create(
  req: Request<{}, {}, ICityCreateBodyProps>,
  res: Response
) {
  const result = await citiesProvider.create(req.body);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(res, result.message);
  }

  return res.status(StatusCodes.CREATED).json(result);
}
