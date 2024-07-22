"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Crowller {
    constructor(analyzer, url) {
        this.analyzer = analyzer;
        this.url = url;
        this.filePath = path_1.default.resolve(__dirname, "../data/course.json");
        this.rawHtml = "";
        this.initSpiderprocess = () => __awaiter(this, void 0, void 0, function* () {
            yield this.getRawHtml();
            this.writeFile();
        });
        this.getRawHtml = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url);
            this.rawHtml = result.text;
        });
        this.writeFile = () => {
            const Content = this.analyzer.analyze(this.rawHtml, this.filePath);
            fs_1.default.writeFileSync(this.filePath, Content);
        };
        this.initSpiderprocess();
    }
}
exports.default = Crowller;
