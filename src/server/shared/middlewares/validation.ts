import { ValidationError } from "yup";
import { TProperty, TValidation } from "../types/validation";
import { StatusCodes } from "http-status-codes";

export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errorsResults: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        errors[error.path] = error.message;
      });

      errorsResults[key] = errors;
    }
  });

  if (Object.entries(errorsResults).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errorsResults,
    });
  }
};
