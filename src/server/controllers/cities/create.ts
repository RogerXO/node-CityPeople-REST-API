import { Request, Response } from "express";
import { ICity, IPostQUery } from "../../shared/models/cities.models";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
  name: yup.string().required().min(3).max(100),
});

const queryValidation: yup.ObjectSchema<IPostQUery> = yup.object().shape({
  filter: yup.string().required().min(3),
});

// export const createBodyValidator = validation("body", bodyValidation);
export const createValidation = validation({
  body: bodyValidation,
  query: queryValidation,
});

export async function create(req: Request<{}, {}, ICity>, res: Response) {
  return res.send("City created");
}

export function teste() {}
