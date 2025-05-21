import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICityQueryProps } from "../../shared/types/cities";
import { validation } from "../../shared/middlewares";
import { utils } from "../../shared/services";
import { citiesProvider } from "../../database/providers/cities";

const queryValidation: yup.ObjectSchema<ICityQueryProps> = yup.object().shape({
  page: yup.number().optional().moreThan(0).default(utils.defaultPage),
  limit: yup.number().optional().moreThan(0).default(utils.defaultLimit),
  filterName: yup.string().optional(),
  id: yup.number().integer().optional().default(0),
});

export const getAllValidation = validation({
  query: queryValidation,
});

export async function getAll(
  req: Request<{}, {}, {}, ICityQueryProps>,
  res: Response
) {
  const result = await citiesProvider.getAll(
    req.query.page || utils.defaultPage,
    req.query.limit || utils.defaultLimit,
    req.query.filterName || "",
    Number(req.query.id)
  );
  const count = await citiesProvider.count(req.query.filterName);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
}
