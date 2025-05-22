import * as yup from "yup";
import { IPersonParamsProps } from "../../shared/types/people";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { peopleProvider } from "../../database/providers/people";
import { utils } from "../../shared/services";

const paramsValidation: yup.ObjectSchema<IPersonParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

export const getByIdValidation = validation({
  params: paramsValidation,
});

export async function getById(req: Request<IPersonParamsProps>, res: Response) {
  const id = req.params.id;

  if (!id) {
    return utils.paramsIdIsRequiredErrorResponse(res);
  }

  const result = await peopleProvider.getById(id);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(res, result);
  }

  return res.status(StatusCodes.OK).json(result);
}
