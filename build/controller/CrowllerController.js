"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowllerController = void 0;
require("reflect-metadata");
var index_1 = require("../decorator/index");
var util_1 = require("../utils/util");
var crowller_1 = __importDefault(require("../utils/crowller"));
var contentAnalyzer_1 = __importDefault(require("../utils/contentAnalyzer"));
var fs = require("fs");
var path = require("path");
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, "请先登录"));
    }
};
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        //expess 类型文件中的 req 类型描述不准确，是 any
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=123456";
        var analyzer = contentAnalyzer_1.default.getInstance();
        new crowller_1.default(analyzer, url);
        res.json((0, util_1.getResponseData)(true));
    };
    CrowllerController.prototype.showData = function (req, res) {
        try {
            var filePath = path.resolve(__dirname, "../../data/course.json");
            var result = fs.readFileSync(filePath, "utf-8");
            res.json((0, util_1.getResponseData)(JSON.parse(result)));
        }
        catch (_a) {
            res.json((0, util_1.getResponseData)(false, "尚未爬取到内容"));
        }
    };
    __decorate([
        (0, index_1.get)("/getData"),
        (0, index_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        (0, index_1.get)("/showData"),
        (0, index_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        (0, index_1.controller)("/")
    ], CrowllerController);
    return CrowllerController;
}());
exports.CrowllerController = CrowllerController;
