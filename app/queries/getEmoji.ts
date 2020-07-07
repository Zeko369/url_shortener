import cheerio from "cheerio"
import { Emoji } from "app/pages"

const genUrl = (params) => `https://emojipedia.org/search/?${params}`

const handler = async (emoji: string): Promise<Emoji[]> => {
  const urlParams = new URLSearchParams()
  urlParams.set("q", emoji)

  const res = await fetch(genUrl(urlParams))
  const html = await res.text()

  const dom = cheerio.load(html)

  return dom(".vendor-rollout-target")
    .map((_, elem) => {
      const name = dom(".vendor-info > h2 > a", elem).text()
      const url = dom(".vendor-image > img", elem).attr("src")

      return { name, url }
    })
    .get()
}

export default handler
