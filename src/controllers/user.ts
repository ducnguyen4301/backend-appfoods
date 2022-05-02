import { Request, Response } from "express";
exports.createUser = (req: Request, res: Response) => {
  console.log(req.body);
  res.send("creating");
};
