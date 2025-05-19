import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICityQueryProps } from "../../shared/types/cities.models";
import { validation } from "../../shared/middlewares";
import { utils } from "../../shared/services";
import { citiesProvider } from "../../database/providers/cities";

const queryValidation: yup.ObjectSchema<ICityQueryProps> = yup.object().shape({
  page: yup.number().optional().moreThan(0).default(utils.defaultPage),
  limit: yup.number().optional().moreThan(0).default(utils.defaultLimit),
  name: yup.string().optional(),
});

export const getAllValidation = validation({
  query: queryValidation,
});

export async function getAll(
  req: Request<{}, {}, {}, ICityQueryProps>,
  res: Response
) {
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 0);

  const result = await citiesProvider.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.setHeader("x-total-count", result.length);
  return res.status(StatusCodes.OK).json(result);
}
