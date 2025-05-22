import * as yup from "yup";
import {
  ICityUpdateBodyProps,
  ICityParamsProps,
} from "../../shared/types/cities";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { citiesProvider } from "../../database/providers/cities";
import { utils } from "../../shared/services";

const paramsValidation: yup.ObjectSchema<ICityParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

const bodyValidation: yup.ObjectSchema<ICityUpdateBodyProps> = yup
  .object()
  .shape({
    name: yup.string().required().min(3).max(60),
  });

export const updateByIdValidation = validation({
  params: paramsValidation,
  body: bodyValidation,
});

export async function updateById(
  req: Request<ICityParamsProps, {}, ICityUpdateBodyProps>,
  res: Response
) {
  const id = req.params.id;
  const body = req.body;

  if (!id) {
    return utils.paramsIdIsRequiredErrorResponse(res);
  }

  const result = await citiesProvider.updateById(id, body);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(res, result);
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}
