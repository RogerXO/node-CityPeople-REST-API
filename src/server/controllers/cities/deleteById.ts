import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { ICityParamsProps } from "../../shared/types/cities.models";
import { StatusCodes } from "http-status-codes";
import { citiesProvider } from "../../database/providers/cities";

const paramsValidation: yup.ObjectSchema<ICityParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

export const deleteByIdValidation = validation({
  params: paramsValidation,
});

export async function deleteById(
  req: Request<ICityParamsProps>,
  res: Response
) {
  const result = await citiesProvider.deleteById(req.params);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}
