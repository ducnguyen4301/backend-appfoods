import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

exports.userValidator = [
  check("email").normalizeEmail().isEmail().withMessage("email is invalid !"),
  check("passWord").trim().not().isEmpty().withMessage("password is missing !"),
];
exports.validate = (req: Request, res: Response, next: NextFunction) => {
  const err = validationResult(req).array();
  if (!err.length) {
    return next();
  }
  res.status(400).json({ error: err[0].msg });
};
