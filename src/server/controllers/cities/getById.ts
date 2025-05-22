import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { ICityParamsProps } from "../../shared/types/cities";
import { StatusCodes } from "http-status-codes";
import { citiesProvider } from "../../database/providers/cities";
import { utils } from "../../shared/services";

const paramsValidation: yup.ObjectSchema<ICityParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

export const getByIdValidation = validation({
  params: paramsValidation,
});

export async function getById(req: Request<ICityParamsProps>, res: Response) {
  const id = req.params.id;

  if (!id) {
    return utils.paramsIdIsRequiredErrorResponse(res);
  }

  const result = await citiesProvider.getById(id);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(res, result);
  }

  return res.status(StatusCodes.OK).json(result);
}
