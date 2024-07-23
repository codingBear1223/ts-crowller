import { Router, Request, Response } from "express";
import Crowller from "./crowller";
import ContentAnalyzer from "./contentAnalyzer";
const fs = require("fs");
const path = require("path");

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
const router = Router();
router.get("/", (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(
      `<html><body><a href='/eight'>爬取内容 </a>
      <a href='/showData'>展示内容 </a>
      <a href='/logout'>退出</a></body></html>`
    );
    return;
  }
  res.send(
    `<html><body><form method="post" action="/login">
        <input type="password" name="password"/>
        <button>登录</button>
    </form></body></html>`
  );
});
router.get("/logout", (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect("/");
});
router.get("/eight", (req: RequestWithBody, res: Response) => {
  //expess 类型文件中的 req 类型描述不准确，是 any
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=123456`;
    const analyzer = ContentAnalyzer.getInstance();

    new Crowller(analyzer, url);
    res.send(`success`);
  } else {
    res.send(`<html><body><a href='/login'>未登录，现在登录</a></body></html>`);
  }
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  //expess 类型文件中的 req 类型描述不准确，是 any
  const isLogin = req.session ? req.session.login : false;
  const { password } = req.body;
  if (isLogin) {
    res.send(`already login`);
    return;
  }
  if (password === "123456") {
    req.session.login = true;
    res.send(`success`);
  } else {
    res.send("wrong password");
  }
});
router.get("/showData", (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (!isLogin) {
    res.send(`<html><body><a href='/login'>未登录，现在登录</a></body></html>`);
    return;
  }
  try {
    const filePath = path.resolve(__dirname, "../data/course.json");
    const result = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(result));
  } catch {
    res.send("尚未爬取到内容");
  }
});
export default router;
