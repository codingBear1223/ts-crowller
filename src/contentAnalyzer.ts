import * as cheerio  from "cheerio"
import fs from "fs"
import {Analyzer} from "./crowller"

interface CourseInfo {
    title: string
    count: number
  }
  
  interface CourseResult {
    time: number
    courseInfos: CourseInfo[]
  }
  
  interface Content {
    [time: string]: CourseInfo[]
  }
export default class ContentAnalyzer implements Analyzer {
  constructor() {
    
  }

  private getPageInfo = (html: string) => {
    const courseInfos: CourseInfo[] = []
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    courseItems.map((index,item) => {
      const descs = $(item).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1], 10)
      console.log(title, count)
      courseInfos.push({ title, count })
    })
    const result = {time: (new Date()).getTime(), courseInfos}
    return result
  }

  parseJson = (pageInfo: CourseResult, filePath:string) => {
    let fileContent: Content = {}
    if(fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    
    fileContent[pageInfo.time] = pageInfo.courseInfos
    console.log(fileContent)
    return fileContent
  }

  public analyze(html: string, path:string) {
    const pageInfo = this.getPageInfo(html)
    const fileContent = this.parseJson(pageInfo, path)
    return JSON.stringify(fileContent)
  }
}