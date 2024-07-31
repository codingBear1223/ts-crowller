import { RequestHandler } from "express";
import { LoginController, CrowllerController } from "../controller";

export function use(middleware: RequestHandler) {
  return function (target: LoginController | CrowllerController, key: string) {
    const middlewares = Reflect.getMetadata("middlewares", target, key) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata("middlewares", middlewares, target, key);
  };
}
