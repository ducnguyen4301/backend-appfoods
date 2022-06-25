import express , { Application } from 'express';
import { env } from "process";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import {userRouter} from '../routers'
const swaggerDocument = require("../swagger.json");
export default async(app: Application) => {

    app.use(express.json());
    app.use(morgan("dev"));

    //app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(`/api/${env.VERSION}/user`, userRouter);

    return app;
}