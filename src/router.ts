import { Router, Request, Response, NextFunction } from "express";
import Crowller from "./utils/crowller";
import ContentAnalyzer from "./utils/contentAnalyzer";
import { getResponseData } from "./utils/util";
const fs = require("fs");
const path = require("path");

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}
const router = Router();

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"));
  }
};

router.get("/", () => {});
router.get("/logout", checkLogin, (req: BodyRequest, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.json(getResponseData(true));
});
router.get("/eight", checkLogin, (req: BodyRequest, res: Response) => {
  //expess 类型文件中的 req 类型描述不准确，是 any

  const url = `http://www.dell-lee.com/typescript/demo.html?secret=123456`;
  const analyzer = ContentAnalyzer.getInstance();

  new Crowller(analyzer, url);
  res.json(getResponseData(true));
});

router.post("/login", (req: BodyRequest, res: Response) => {
  //expess 类型文件中的 req 类型描述不准确，是 any
  const isLogin = req.session ? req.session.login : false;
  const { password } = req.body;
  if (isLogin) {
    res.json(getResponseData(false, "已经登录"));
    return;
  }
  if (password === "123456") {
    req.session.login = true;
    res.json(getResponseData(true));
  } else {
    res.json(getResponseData(false, "密码错误"));
  }
});
router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const filePath = path.resolve(__dirname, "../data/course.json");
    const result = fs.readFileSync(filePath, "utf-8");
    res.json(getResponseData(JSON.parse(result)));
  } catch {
    res.json(getResponseData(false, "尚未爬取到内容"));
  }
});
export default router;
