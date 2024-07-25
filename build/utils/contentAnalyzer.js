"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = __importStar(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var ContentAnalyzer = /** @class */ (function () {
    function ContentAnalyzer() {
        this.getPageInfo = function (html) {
            var courseInfos = [];
            var $ = cheerio.load(html);
            var courseItems = $(".course-item");
            courseItems.map(function (index, item) {
                var descs = $(item).find(".course-desc");
                var title = descs.eq(0).text();
                var count = parseInt(descs.eq(1).text().split("：")[1], 10);
                console.log(title, count);
                courseInfos.push({ title: title, count: count });
            });
            var result = { time: new Date().getTime(), courseInfos: courseInfos };
            return result;
        };
        this.parseJson = function (pageInfo, filePath) {
            var fileContent = {};
            if (fs_1.default.existsSync(filePath)) {
                fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            }
            fileContent[pageInfo.time] = pageInfo.courseInfos;
            console.log(fileContent);
            return fileContent;
        };
    }
    ContentAnalyzer.prototype.analyze = function (html, path) {
        var pageInfo = this.getPageInfo(html);
        var fileContent = this.parseJson(pageInfo, path);
        return JSON.stringify(fileContent);
    };
    ContentAnalyzer.getInstance = function () {
        if (!ContentAnalyzer.instance) {
            ContentAnalyzer.instance = new ContentAnalyzer();
        }
        return ContentAnalyzer.instance;
    };
    return ContentAnalyzer;
}());
exports.default = ContentAnalyzer;
