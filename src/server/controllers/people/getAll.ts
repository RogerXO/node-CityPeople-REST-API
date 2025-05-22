import * as yup from "yup";
import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { IPersonQueryProps } from "../../shared/types/people";
import { utils } from "../../shared/services";
import { peopleProvider } from "../../database/providers/people";
import { StatusCodes } from "http-status-codes";

const queryValidation: yup.ObjectSchema<IPersonQueryProps> = yup
  .object()
  .shape({
    page: yup.number().optional().moreThan(0).default(utils.defaultPage),
    limit: yup.number().optional().moreThan(0).default(utils.defaultLimit),
    nameFilter: yup.string().optional().default(""),
  });

export const getAllValidation = validation({
  query: queryValidation,
});

export async function getAll(
  req: Request<{}, {}, {}, IPersonQueryProps>,
  res: Response
) {
  const query = req.query;
  const nameFilter = query.nameFilter || "";

  const people = await peopleProvider.getAll(
    query.page || utils.defaultPage,
    query.limit || utils.defaultLimit,
    nameFilter
  );

  const count = await peopleProvider.count(nameFilter);

  if (people instanceof Error) {
    return utils.internalServerErrorResponse(res, people.message);
  }

  if (count instanceof Error) {
    return utils.internalServerErrorResponse(res, count.message);
  }

  res.setHeader("acess-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(people);
}
