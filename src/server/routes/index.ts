import { Router } from "express";
import { Request, Response } from "express";
import { citiesController } from "../controllers";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  return res.send("Hello world");
});

router.post(
  "/cities",
  // citiesController.createBodyValidator,
  citiesController.createValidation,
  citiesController.create
);

export { router };
