import * as yup from "yup";
import { IPersonParamsProps } from "../../shared/types/people";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { peopleProvider } from "../../database/providers/people";
import { StatusCodes } from "http-status-codes";
import { utils } from "../../shared/services";

const paramsValidation: yup.ObjectSchema<IPersonParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().moreThan(0).required(),
  });

export const deleteByIdValidation = validation({
  params: paramsValidation,
});

export async function deleteById(
  req: Request<IPersonParamsProps, {}, {}>,
  res: Response
) {
  const id = req.params.id;

  if (!id) {
    return utils.paramsIdIsRequiredErrorResponse(res);
  }

  const result = await peopleProvider.deleteById(id);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(res, result);
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}
