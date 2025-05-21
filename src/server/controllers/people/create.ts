import { Request, Response } from "express";
import * as yup from "yup";
import { IPersonCreateBodyProps } from "../../shared/types/people";
import { validation } from "../../shared/middlewares";
import { peopleProvider } from "../../database/providers/people";
import { StatusCodes } from "http-status-codes";
import { utils } from "../../shared/services";

const bodyValidation: yup.ObjectSchema<IPersonCreateBodyProps> = yup
  .object()
  .shape({
    fullName: yup.string().required().min(2),
    email: yup.string().required().email(),
    cityId: yup.number().integer().moreThan(0).required(),
  });

export const createValidation = validation({
  body: bodyValidation,
});

export async function create(
  req: Request<{}, {}, IPersonCreateBodyProps>,
  res: Response
) {
  const body = req.body;

  const result = await peopleProvider.create(body);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(result);
  }

  return res.status(StatusCodes.CREATED).json(result);
}
