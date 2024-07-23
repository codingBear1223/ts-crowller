import SuperAgent from "superagent";
import fs from "fs";
import path from "path";

export interface Analyzer {
  analyze(html: string, filePath: string): string;
}

export default class Crowller {
  private filePath = path.resolve(__dirname, "../../data/course.json");
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
