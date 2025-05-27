import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import {
  IPersonParamsProps,
  IPersonUpdateBodyProps,
} from "../../shared/types/people";
import { Request, Response } from "express";
import { peopleProvider } from "../../database/providers/people";
import { StatusCodes } from "http-status-codes";
import { utils } from "../../shared/services";

const paramsValidation: yup.ObjectSchema<IPersonParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

const bodyValidation: yup.ObjectSchema<IPersonUpdateBodyProps> = yup
  .object()
  .shape({
    fullName: yup.string().required().min(2),
    email: yup.string().required().email(),
    cityId: yup.number().integer().moreThan(0).required(),
  });

export const updateByIdValidation = validation({
  params: paramsValidation,
  body: bodyValidation,
});

export async function updateById(
  req: Request<IPersonParamsProps, {}, IPersonUpdateBodyProps>,
  res: Response
) {
  const id = req.params.id;
  const body = req.body;

  if (!id) {
    return utils.paramsIdIsRequiredErrorResponse(res);
  }

  const result = await peopleProvider.updateById(id, body);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(res, result.message);
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}
