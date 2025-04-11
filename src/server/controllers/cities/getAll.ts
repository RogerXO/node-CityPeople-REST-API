import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CityQueryProps } from "../../shared/models/cities.models";
import { validation } from "../../shared/middlewares";
import { utils } from "../../shared/services";

const queryValidation: yup.ObjectSchema<CityQueryProps> = yup.object().shape({
  page: yup.number().optional().moreThan(0).default(utils.defaultPage),
  limit: yup.number().optional().moreThan(0).default(utils.defaultLimit),
  name: yup.string().optional(),
});

export const getAllValidation = validation({
  query: queryValidation,
});

export async function getAll(
  req: Request<{}, {}, {}, CityQueryProps>,
  res: Response
) {
  console.log(req.query);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Not implemented!");
}
