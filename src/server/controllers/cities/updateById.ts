import * as yup from "yup";
import {
  ICityCreateBodyProps,
  ICityParamsProps,
} from "../../shared/models/cities.models";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const paramsValidation: yup.ObjectSchema<ICityParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

const bodyValidation: yup.ObjectSchema<ICityCreateBodyProps> = yup
  .object()
  .shape({
    name: yup.string().required().min(3).max(60),
  });

export const updateByIdValidation = validation({
  params: paramsValidation,
  body: bodyValidation,
});

export async function updateById(
  req: Request<ICityParamsProps, {}, ICityCreateBodyProps>,
  res: Response
) {
  console.log(req.params, req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Not implemented!");
}
