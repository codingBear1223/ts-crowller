import SuperAgent from "superagent"
import * as cheerio  from "cheerio"
import fs from "fs"
import path from "path"
import ContentAnalyzer from "./contentAnalyzer"


class Crowller {
    private secret = "123456"
    private filePath = path.resolve(__dirname, './data/course.json')
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
    private rawHtml = ''

    initSpiderprocess = async () => {
      await this.getRawHtml() 
      this.writeFile()
    }
    getRawHtml = async () => {
      const result = await SuperAgent.get(this.url)
      this.rawHtml = result.text
    }

    writeFile = () => {
      const Content = this.analyzer.analyze(this.rawHtml, this.filePath)
      fs.writeFileSync(this.filePath, Content)
    }

    constructor(private analyzer: ContentAnalyzer) {
        this.initSpiderprocess() 
    }
}

const analyzer = new ContentAnalyzer()
const crowller = new Crowller(analyzer)
