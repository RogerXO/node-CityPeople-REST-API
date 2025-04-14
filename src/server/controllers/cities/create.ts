import { Request, Response } from "express";
import { ICityCreateBodyProps } from "../../shared/models/cities.models";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

const bodyValidation: yup.ObjectSchema<ICityCreateBodyProps> = yup.object().shape({
  name: yup.string().required().min(3).max(60),
});

export const createValidation = validation({
  body: bodyValidation,
});

export async function create(
  req: Request<{}, {}, ICityCreateBodyProps>,
  res: Response
) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Not implemented");
}
