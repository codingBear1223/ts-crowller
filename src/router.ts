import { Router, Request, Response } from "express";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("9999");
});
router.get("/eight", (req: Request, res: Response) => {
  res.send("888");
});
export default router;
