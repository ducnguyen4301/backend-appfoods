import { Schema, model } from "mongoose";
const mongoose = require("mongoose");
const bscrypt = require("bcrypt");
interface userProps {
  userName: String;
  passWord: String;
  email: String;
  avatar: String;
  phoneNumber: String;
  address: String;
  thumbnails: [];
  tokenUser: [];
}

const userSchema = new Schema<userProps>({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  tokenUser: [{ type: Object }],
  thumbnails: [{ url: URL}],
});

const User = model<userProps>("User", userSchema);

module.exports = User;
