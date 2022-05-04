import { Request, Response } from "express";
import bscrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
require("dotenv").config();
const User = require("../models/user");
exports.createUser = async (req: Request, res: Response) => {
  const { userName, passWord, email, avatar, phoneNumber, address, tokenUser } =
    req.body;
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res
      .status(400)
      .json({ success: false, error: "Email already exists !" });
  }
  const newUser = new User({
    userName,
    passWord,
    email,
    avatar,
    phoneNumber,
    address,
    tokenUser,
  });
  await newUser.save();
  res.json(newUser);
};
exports.signinUser = async (res: Response, req: Request) => {
  const { email, passWord } = req.body;
  if (!email.trim() || !passWord.trim()) {
    return res
      .status(400)
      .json({ success: false, error: "email/password is missing !" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, error: "User not found !" });
  }
  const isMatched = await user.comparePassword(passWord)
  if(!isMatched){
    return res.status(400).json({ success: false, error: "email/password does not match !" });
  }
  return res.json({ success: true, user:{id: user._id,email:user.email}})
};
