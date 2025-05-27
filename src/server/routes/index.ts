import { Router } from "express";
import {
  citiesController,
  peopleController,
  usersController,
} from "../controllers";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

// Cities routes
router.get(
  "/cities",
  ensureAuthenticated,
  citiesController.getAllValidation,
  citiesController.getAll
);
router.get(
  "/cities/:id",
  ensureAuthenticated,
  citiesController.getByIdValidation,
  citiesController.getById
);
router.post(
  "/cities",
  ensureAuthenticated,
  citiesController.createValidation,
  citiesController.create
);
router.put(
  "/cities/:id",
  ensureAuthenticated,
  citiesController.updateByIdValidation,
  citiesController.updateById
);
router.delete(
  "/cities/:id",
  ensureAuthenticated,
  citiesController.deleteByIdValidation,
  citiesController.deleteById
);

// People routes
router.get(
  "/people",
  ensureAuthenticated,
  peopleController.getAllValidation,
  peopleController.getAll
);
router.get(
  "/people/:id",
  ensureAuthenticated,
  peopleController.getByIdValidation,
  peopleController.getById
);
router.post(
  "/people",
  ensureAuthenticated,
  peopleController.createValidation,
  peopleController.create
);
router.put(
  "/people/:id",
  ensureAuthenticated,
  peopleController.updateByIdValidation,
  peopleController.updateById
);
router.delete(
  "/people/:id",
  ensureAuthenticated,
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
