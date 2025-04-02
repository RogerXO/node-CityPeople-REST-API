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
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach((err) => {
      if (!err.path) return;

      validationErrors[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
  }

  return res.send("City created");
}

export function teste() {}
