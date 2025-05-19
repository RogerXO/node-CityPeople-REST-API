import * as yup from "yup";
import {
  ICityCreateBodyProps,
  ICityParamsProps,
} from "../../shared/types/cities.models";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { citiesProvider } from "../../database/providers/cities";

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
  let result;
  const id = req.params.id;

  if (id) result = await citiesProvider.updateById(id, req.body);

  // if (Number(req.params.id) === 99999)
  //   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //     errors: {
  //       default: "City not found",
  //     },
  //   });

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}
