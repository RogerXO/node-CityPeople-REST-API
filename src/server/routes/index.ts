import { Router } from "express";
import { citiesController } from "../controllers";

const router = Router();

router.get(
  "/cities",
  citiesController.getAllValidation,
  citiesController.getAll
);

router.get(
  "/cities/:id",
  citiesController.getByIdValidation,
  citiesController.getById
);

router.post(
  "/cities",
  citiesController.createValidation,
  citiesController.create
);

router.put(
  "/cities/:id",
  citiesController.updateByIdValidation,
  citiesController.updateById
);

router.delete(
  "/cities/:id",
  citiesController.deleteByIdValidation,
  citiesController.deleteById
);

export { router };
