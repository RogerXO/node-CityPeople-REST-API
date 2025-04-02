import { Request, Response } from "express";

export function create(req: Request, res: Response) {
  return res.send("Person created")
}
