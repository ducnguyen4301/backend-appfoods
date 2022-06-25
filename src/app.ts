import express from "express";
import { Request, Response } from "express";
import { env } from "process";

import ConnectExpress from "./services/ConnectExpress";
import Database from "./services/Database";


const StartServer = async () => {
  const app = express();

  await Database();

  await ConnectExpress(app);

  app.get("/", (req: Request, res: Response) => {
    res.send("THIS IS BACK END OF APP FOODS");
  });
  app.listen(env.PORT, () => {
    console.log("port is running " + env.PORT);
  });
};

StartServer();
