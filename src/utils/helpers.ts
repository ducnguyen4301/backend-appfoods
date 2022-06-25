import { Response } from "express";
export const sendError = (res: Response, error: any, status = 401) => {
  res.status(status).json({ success: false, error });
};

import bcrypt from "bcrypt";

const salt = 8;
export const GenerateSalt = async () => {
  return await bcrypt.genSalt(salt);
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
