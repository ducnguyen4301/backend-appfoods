import { Schema, model } from "mongoose";
import { Document } from "mongoose";
interface userProps extends Document {
  name: string;
  passWord: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  address: string;
  salt: string;
  accessToken: string;
  verified: boolean;
}

const userSchema = new Schema<userProps>({
  name: { type: String },
  passWord: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: "" },
  phoneNumber: { type: String },
  address: { type: String },
  salt: { type: String,required: true },
  verified: { type: Boolean, default: false },
  accessToken: { type: String },
});
const User = model<userProps>("User", userSchema);

export { User };
