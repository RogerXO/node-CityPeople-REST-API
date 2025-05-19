import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { ICityParamsProps } from "../../shared/types/cities.models";
import { StatusCodes } from "http-status-codes";
import { citiesProvider } from "../../database/providers/cities";

const paramsValidation: yup.ObjectSchema<ICityParamsProps> = yup
  .object()
  .shape({
    id: yup.number().integer().required().moreThan(0),
  });

export const deleteByIdValidation = validation({
  params: paramsValidation,
});

export async function deleteById(
  req: Request<ICityParamsProps>,
  res: Response
) {
  const id = req.params.id;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: "O parâmetro 'id' precisa ser informado",
      },
    });
  }

  const result = await citiesProvider.deleteById(id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}
