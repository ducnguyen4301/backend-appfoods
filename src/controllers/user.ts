import { Request, Response } from "express";
import { CreateUserDTO, UserLoginEmail } from "../dto/user.dto";
import {
  GenerateAccessToken,
  GenerateName,
  GeneratePassword,
  GenerateSalt,
  ValidatePassword,
} from "../utils/helpers";
import { User } from "../models/user";

require("dotenv").config();
export const signupUser = async (req: Request, res: Response) => {
  const { passWord, email, avatar, phoneNumber, address, verified } = <
    CreateUserDTO
  >req.body;
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(passWord, salt);

  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res
      .status(400)
      .json({ success: false, error: "Email already exists !" });
  }
  const name = await GenerateName();
  const token = await GenerateAccessToken({ email: email });
  const newUser = await User.create({
    name: name,
    passWord: userPassword,
    email: email,
    avatar,
    phoneNumber: "",
    address: "",
    salt: salt,
    verified: verified,
    accessToken: token,
  });
  if (newUser) {
    return res.status(201).json({
      success: true,
      accessToken: token,
      verified: newUser.verified,
    });
  }
  return res
    .status(400)
    .json({ success: false, error: "ERROR WHEN CREATING USER!" });
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
    user: { id: user._id, email: user.email, accessToken: user.accessToken },
  });
};

export const getUserProfile = async (req: Request, res: Response) => {
  const customer = req.body._id;

  if (customer) {
    const profile = await User.findById(customer._id);

    if (profile) {
      return res.status(201).json(profile);
    }
  }
  return res.status(400).json({ error: "User not found !" });
};
