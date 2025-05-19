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

export const getByIdValidation = validation({
  params: paramsValidation,
});

export async function getById(req: Request<ICityParamsProps>, res: Response) {
  let result;

  if (req.params.id) result = await citiesProvider.getById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Register not found",
      },
    });

  return res.status(StatusCodes.OK).send(result);
}
