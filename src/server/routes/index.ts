import { Router } from "express";
import {
  citiesController,
  peopleController,
  usersController,
} from "../controllers";

const router = Router();

// Cities routes
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

// People routes
router.get(
  "/people",
  peopleController.getAllValidation,
  peopleController.getAll
);
router.get(
  "/people/:id",
  peopleController.getByIdValidation,
  peopleController.getById
);
router.post(
  "/people",
  peopleController.createValidation,
  peopleController.create
);
router.put(
  "/people/:id",
  peopleController.updateByIdValidation,
  peopleController.updateById
);
router.delete(
  "/people/:id",
  peopleController.deleteByIdValidation,
  peopleController.deleteById
);

// SignIn / SignUp routes
router.post(
  "/signup",
  usersController.signUpValidation,
  usersController.signUp
);
router.post(
  "/signin",
  usersController.signInValidation,
  usersController.signIn
);

export { router };
