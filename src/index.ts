import express, { Express, NextFunction, Request, Response } from "express";
import router from "./router";
import bodyParser from "body-parser";

const app = express();
//express 中间件对 req 或 res 修改之后，并不能修改其类型
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  req.userName = "bear";
  next();
});
app.use(router);
app.listen(7001, () => {
  console.log("server is running");
});
