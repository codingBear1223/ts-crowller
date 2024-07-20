import SuperAgent from "superagent";
import fs from "fs";
import path from "path";
import ContentAnalyzer from "./contentAnalyzer";

export interface Analyzer {
  analyze(html: string, filePath: string): string;
}

class Crowller {
  private filePath = path.resolve(__dirname, "./data/course.json");
  private rawHtml = "";

  initSpiderprocess = async () => {
    await this.getRawHtml();
    this.writeFile();
  };
  getRawHtml = async () => {
    const result = await SuperAgent.get(this.url);
    this.rawHtml = result.text;
  };

  writeFile = () => {
    const Content = this.analyzer.analyze(this.rawHtml, this.filePath);
    fs.writeFileSync(this.filePath, Content);
  };

  constructor(private analyzer: Analyzer, private url: string) {
    this.initSpiderprocess();
  }
}

const secret = "123456";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = ContentAnalyzer.getInstance();
new Crowller(analyzer, url);
