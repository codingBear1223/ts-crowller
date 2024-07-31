import { RequestHandler } from "express";
import { LoginController, CrowllerController } from "../controller";

export function use(middleware: RequestHandler) {
  return function (target: LoginController | CrowllerController, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
