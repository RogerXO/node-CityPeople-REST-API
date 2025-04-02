import { Request, Response } from "express";
import { ICity } from "../../models/cities.models";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
  name: yup.string().required().min(3).max(100),
});

export async function create(req: Request<{}, {}, ICity>, res: Response) {
  let validatedData: ICity | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors,
    });
  }

  return res.send("City created");
}

export function teste() {}
