import { check } from "express-validator";

exports.userValidator = [
  check("userName").isEmpty().withMessage("userName is missing !"),
  check("password").isEmpty().withMessage("userName is missing !"),
  check("email").isEmpty().withMessage("userName is missing !"),
  check("avatar").isEmpty().withMessage("userName is missing !"),
  check("phoneNumber").isEmpty().withMessage("userName is missing !"),
  check("address").isEmpty().withMessage("userName is missing !"),
];
