import SuperAgent from "superagent"
import * as cheerio  from "cheerio"
import fs from "fs"
import path from "path"

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
class Crowller {
    private secret = "123456"
    
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
    private rawHtml = ''

    getRawHtml = async () => {
      const result = await SuperAgent.get(this.url)
      this.rawHtml = result.text
      const pageInfo = this.getPageInfo()
      this.parseJson(pageInfo)
    }

    getPageInfo = () => {
      const courseInfos: CourseInfo[] = []
      const $ = cheerio.load(this.rawHtml)
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

    parseJson = (pageInfo: CourseResult) => {
      
      const filePath = path.resolve(__dirname, './data/course.json')
      let fileContent: Content = {}
      if(fs.existsSync(filePath)) {
        fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      }
      
      fileContent[pageInfo.time] = pageInfo.courseInfos
      console.log(fileContent)
      fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }


    constructor() {
      this.getRawHtml()    
    }
}

const crowller = new Crowller()
