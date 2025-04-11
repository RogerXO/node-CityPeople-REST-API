import { Router } from "express";
import { Request, Response } from "express";
import { citiesController } from "../controllers";

const router = Router();

router.get(
  "/cities",
  citiesController.getAllValidation,
  citiesController.getAll
);

router.post(
  "/cities",
  citiesController.createValidation,
  citiesController.create
);

export { router };
