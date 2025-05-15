import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { ICityParamsProps } from "../../shared/models/cities.models";
import { StatusCodes } from "http-status-codes";

const paramsValidation: yup.ObjectSchema<ICityParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

export const getByIdValidation = validation({
  params: paramsValidation,
});

export async function getById(req: Request<ICityParamsProps>, res: Response) {
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Register not found",
      },
    });

  return res.status(StatusCodes.OK).send({
    id: req.params.id,
    name: "Belo Horizonte",
  });
}
