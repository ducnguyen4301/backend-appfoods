import { Request, Response } from "express";
const User = require('../models/user');
exports.createUser = (req: Request, res: Response) => {
  const {
    userName,
    password,
    email,
    avatar,
    phoneNumber,
    address,
    tokenUser,
  } = req.body;
  const newUser = new User({userName,password,email,avatar,phoneNumber,address,tokenUser});
  res.json(newUser);
};
