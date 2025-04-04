import { NextFunction, Request, Response } from "express";
import { ICity, IPostQUery } from "../../models/cities.models";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
  name: yup.string().required().min(3).max(100),
});

// Middleware
export async function createBodyValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
    return next();
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
}

const queryValidation: yup.ObjectSchema<IPostQUery> = yup.object().shape({
  filter: yup.string().required(),
});

export async function createQueryValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await queryValidation.validate(req.query, { abortEarly: false });
    return next();
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
}

export async function create(req: Request<{}, {}, ICity>, res: Response) {
  return res.send("City created");
}

export function teste() {}
