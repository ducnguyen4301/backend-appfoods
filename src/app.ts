import { Request, Response } from "express";
import { env } from "process";
require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
const PORT = env.PORT;
const userRouter = require("./routers/user");

app.use(`/api/${env.VERSION}/user`, userRouter);

app.get('/',(req: Request, res : Response)=>{
  res.send('THIS IS BACK END OF APP FOODS')
})
app.listen(PORT, () => {
  console.log("port is running " + PORT)
});
