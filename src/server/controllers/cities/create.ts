import { Request, Response } from "express";
import { ICities } from "../../models/cities.models";

export function create(req: Request<{}, {}, ICities>, res: Response) {
  const data = req.body

  return res.send("City created");
}

export function teste() {}
