import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { UserPayload } from "../dto/user.dto";
import jwt from "jsonwebtoken";
import { env } from "process";
export const sendError = (res: Response, error: any, status = 401) => {
  res.status(status).json({ success: false, error });
};
const SALT = 8;
export const GenerateSalt = async () => {
  return await bcrypt.genSalt(SALT);
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};
export const GenerateName = async () => {
  return "FC" + Math.random().toString(36).substring(4);
};

export const GenerateAccessToken = async (payload: UserPayload) => {
  return jwt.sign(payload, env.SECRET as string, { expiresIn: "7d" });
};
