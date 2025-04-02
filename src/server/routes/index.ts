import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { citiesController, peopleController } from "../controllers";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  return res.send("Hello world");
});

router.post("/cities", citiesController.create);

export { router };
