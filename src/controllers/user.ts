import { NextFunction, Request, Response } from "express";
import bscrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
import { CreateUserDTO, UserLoginEmail } from "../dto/user.dto";
import {
  GeneratePassword,
  GenerateSalt,
  ValidatePassword,
} from "../utils/helpers";
import { User } from "../models/user";

require("dotenv").config();
export const signupUser = async (req: Request, res: Response) => {
  const {
    userName,
    passWord,
    email,
    avatar,
    phoneNumber,
    address,
    tokenUser,
    verified,
  } = <CreateUserDTO>req.body;
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(passWord, salt);
  console.log(userPassword);

  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res
      .status(400)
      .json({ success: false, error: "Email already exists !" });
  }
  const newUser = new User({
    userName,
    passWord: userPassword,
    email,
    avatar,
    phoneNumber,
    address,
    salt,
    verified,
    tokenUser,
  });
  await newUser.save();
  res.json(newUser);
};
export const signinUser = async (req: Request, res: Response) => {
  const { email, passWord } = <UserLoginEmail>req.body;
  if (!email.trim() || !passWord.trim()) {
    return res
      .status(400)
      .json({ success: false, error: "email/password is missing !" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, error: "User not found !" });
  }
  const validation = await ValidatePassword(passWord, user.passWord, user.salt);
  if (!validation) {
    return res
      .status(400)
      .json({ success: false, error: "email/password does not match !" });
  }
  return res.json({
    success: true,
    user: { id: user._id, email: user.email },
  });
};

export const getUserProfile = async (req: Request, res: Response) => {
  const customer = req.body;

  if (customer) {
    const profile = await User.findById(customer._id);

    if (profile) {
      return res.status(201).json(profile);
    }
  }
  return res.status(400).json({ error: "User not found !" });
};
