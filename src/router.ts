import { Router, Request, Response } from "express";
import Crowller from "./crowller";
import ContentAnalyzer from "./contentAnalyzer";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("9999");
});
router.get("/eight", (req: Request, res: Response) => {
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=123456`;
  const analyzer = ContentAnalyzer.getInstance();

  new Crowller(analyzer, url);
  res.send("888");
});
export default router;
