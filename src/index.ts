import express, { Express, Request, Response } from "express";

const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("9999");
});
app.listen(7001, () => {
  console.log("server is running");
});
