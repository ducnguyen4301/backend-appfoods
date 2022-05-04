import { NextFunction,Request,Response} from "express";
import { check, validationResult } from "express-validator";

exports.userValidator = [
  check("userName").not().isEmpty().withMessage("userName is missing !"),
  check("password").isEmpty().withMessage("userName is missing !"),
  check("email").isEmpty().withMessage("userName is missing !"),
  check("avatar").isEmpty().withMessage("userName is missing !"),
  check("phoneNumber").isEmpty().withMessage("userName is missing !"),
  check("address").isEmpty().withMessage("userName is missing !"),
];
exports.validate = (req: Request, res: Response, next: NextFunction) =>{
  const err = validationResult(req).array()
  if(!err.length){
    next()
  }
  res.status(400).json({error: err[0].msg})
}