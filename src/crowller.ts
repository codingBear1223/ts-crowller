import SuperAgent from "superagent"
import * as cheerio  from "cheerio"

interface CourseInfo {
  title: string
  count: number
}
class Crowller {
    private secret = "123456"
    
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
    private rawHtml = ''
    getRawHtml = async () => {
      const result = await SuperAgent.get(this.url)
      this.rawHtml = result.text
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
    }
    constructor() {
      this.getRawHtml()
      this.getPageInfo()
    }
}

const crowller = new Crowller()
