import { Request, Response } from "express";
import { env } from "process";
import swaggerUi from "swagger-ui-express";
require("dotenv").config();
require("./db");
const swaggerDocument = require("./swagger.json");
const morgan = require("morgan");
const express = require("express");
const app = express();
const PORT = env.PORT || 8000;
const userRouter = require("./routers/user");

app.use(express.json());
app.use(`/api/${env.VERSION}/user`, userRouter);
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.send("THIS IS BACK END OF APP FOODS");
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//     },
//   })
// );
app.listen(PORT, () => {
  console.log("port is running " + PORT);
});
