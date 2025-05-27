import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { JWTService, passwordCrypto, utils } from "../../shared/services";
import { IUserSignInBodyProps } from "../../shared/types/users";
import { usersProvider } from "../../database/providers/users";

const bodyValidation: yup.ObjectSchema<IUserSignInBodyProps> = yup
  .object()
  .shape({
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(6),
  });

export const signInValidation = validation({
  body: bodyValidation,
});

export async function signIn(
  req: Request<{}, {}, IUserSignInBodyProps>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await usersProvider.getByEmail(email);

  if (user instanceof Error) {
    return utils.loginErrorResponse(res);
  }

  const passwordMatch = await passwordCrypto.verifyPassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    return utils.loginErrorResponse(res);
  }

  const accessToken = JWTService.sign({ uid: user.id });

  if (accessToken === "JWT_SECRET_NOT_FOUND")
    return utils.internalServerErrorResponse(
      res,
      "Erro ao gerar token de acesso"
    );

  return res.status(StatusCodes.OK).json({ accessToken });
}
