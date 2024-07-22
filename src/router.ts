import { Router, Request, Response } from "express";
import Crowller from "./crowller";
import ContentAnalyzer from "./contentAnalyzer";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send(
    `<html><body><form method="post" action="/eight">
        <input type="password" name="password"/>
        <button>提交</button>
    </form></body></html>`
  );
});
router.post("/eight", (req: RequestWithBody, res: Response) => {
  //expess 类型文件中的 req 类型描述不准确，是 any
  const { password } = req.body;
  if (password === "123456") {
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${password}`;
    const analyzer = ContentAnalyzer.getInstance();

    new Crowller(analyzer, url);
    res.send(`${req.userName} success`);
  } else {
    res.send("wrong password");
  }
});
export default router;
