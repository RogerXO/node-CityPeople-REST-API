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
  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Not implemented!");
}
