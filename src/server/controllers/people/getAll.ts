import * as yup from "yup";
import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { IpersonQueryProps } from "../../shared/types/people";
import { utils } from "../../shared/services";
import { peopleProvider } from "../../database/providers/people";
import { StatusCodes } from "http-status-codes";

const queryValidation: yup.ObjectSchema<IpersonQueryProps> = yup
  .object()
  .shape({
    page: yup.number().optional().moreThan(0).default(utils.defaultPage),
    limit: yup.number().optional().moreThan(0).default(utils.defaultLimit),
    nameFilter: yup.string().optional(),
    id: yup.number().integer().optional().default(0),
  });

export const getAllValidation = validation({
  query: queryValidation,
});

export async function getAll(
  req: Request<{}, {}, {}, IpersonQueryProps>,
  res: Response
) {
  const query = req.query;
  const nameFilter = query.nameFilter || "";

  const result = await peopleProvider.getAll(
    query.page || utils.defaultPage,
    query.limit || utils.defaultLimit,
    nameFilter
  );

  const count = await peopleProvider.count(nameFilter);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(result);
  }

  if (count instanceof Error) {
    return utils.internalServerErrorResponse(count);
  }

  res.setHeader("acess-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
}
