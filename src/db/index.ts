import { env } from "process";

const mongoose = require("mongoose");
const pass = env.PASSWORD_MONGODB;
const userName = env.USERNAME_MONGODB;
const URI = `mongodb+srv://${userName}:${pass}@cluster0.zvplh.mongodb.net/Appfoods`
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  })
  .then(() => {
    console.log("our db is connected");
  })
  .catch((err: any) => console.log(err.message));
