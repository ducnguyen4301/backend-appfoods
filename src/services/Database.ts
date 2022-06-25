import { env } from "process";

const mongoose = require("mongoose");
const pass = env.PASSWORD_MONGODB;
const userName = env.USERNAME_MONGODB;
const URI = `mongodb+srv://${userName}:${pass}@cluster0.zvplh.mongodb.net/Appfoods`;
export default async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    });
    console.log("Connected Database");
    
  } catch (err: any) {
    console.log(err.message);
  }
};
