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

  const person = await peopleProvider.getById(id);

  if (person instanceof Error) {
    return utils.internalServerErrorResponse(res, person.message);
  }

  return res.status(StatusCodes.OK).json(person);
}
