import cheerio from "cheerio"
import { Emoji } from "app/pages"
// https://emojipedia.org/search/?q=asd
const genUrl = (params) => `https://emojipedia.org/search/?${params}`

const handler = async (emoji: string): Promise<Emoji[]> => {
  const urlParams = new URLSearchParams()
  urlParams.set("q", emoji)

  const res = await fetch(genUrl(urlParams))
  const html = await res.text()

  const dom = cheerio.load(html)

  // return html

  return dom(".vendor-rollout-target")
    .map((index, elem) => {
      const name = dom(".vendor-info > h2 > a", elem).text()
      const url = dom(".vendor-image > img", elem).attr("src")

      return { name, url }
    })
    .get()
}

export default handler
