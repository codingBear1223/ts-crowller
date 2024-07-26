import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { controller, get, use } from "./decorator";
import { getResponseData } from "../utils/util";
import Crowller from "../utils/crowller";
import ContentAnalyzer from "../utils/contentAnalyzer";
const fs = require("fs");
const path = require("path");

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"));
  }
};

@controller
class CrowllerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: BodyRequest, res: Response) {
    //expess 类型文件中的 req 类型描述不准确，是 any

    const url = `http://www.dell-lee.com/typescript/demo.html?secret=123456`;
    const analyzer = ContentAnalyzer.getInstance();

    new Crowller(analyzer, url);
    res.json(getResponseData(true));
  }
  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response) {
    try {
      const filePath = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(filePath, "utf-8");
      res.json(getResponseData(JSON.parse(result)));
    } catch {
      res.json(getResponseData(false, "尚未爬取到内容"));
    }
  }
}
