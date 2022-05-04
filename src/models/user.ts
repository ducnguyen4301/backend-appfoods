import { Schema, model } from "mongoose";
import bscrypt from "bcrypt";
import { Document } from "mongoose";
interface userProps {
  userName: String;
  passWord: String;
  email: String;
  avatar: String;
  phoneNumber: String;
  address: String;
  tokenUser: [];
}

const userSchema = new Schema<userProps>({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: "" },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  tokenUser: [{ type: String }],
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("passWord")) {
    const hash = bscrypt.hashSync(user.passWord.toString(), 8);
    user.passWord = hash;
  }
  next();
});
userSchema.methods.comparePassword = async function (passWord: any) {
  const result = await bscrypt.compare(passWord, this.passWord);
  return result;
};
const User = model<userProps>("User", userSchema);

module.exports = User;
