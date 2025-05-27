import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { utils } from "../../shared/services";
import { IUserSignUpBodyProps } from "../../shared/types/users";
import { usersProvider } from "../../database/providers/users";

const bodyValidation: yup.ObjectSchema<IUserSignUpBodyProps> = yup
  .object()
  .shape({
    name: yup.string().required().min(2),
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(6),
  });

export const signUpValidation = validation({
  body: bodyValidation,
});

export async function signUp(
  req: Request<{}, {}, IUserSignUpBodyProps>,
  res: Response
) {
  const result = await usersProvider.create(req.body);

  if (result instanceof Error) {
    return utils.internalServerErrorResponse(res, result.message);
  }

  return res.status(StatusCodes.CREATED).json(result);
}
