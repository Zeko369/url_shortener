import { Request, Response } from "express"
import db, { Link } from "../../db"

const saveClick = async (req: Request, link: Link) => {
  let ua = req.header("user-agent")

  if (ua) {
    try {
      ua = ua.slice(ua.indexOf("(") + 1, ua.indexOf(")"))
    } catch (err) {
      console.error("Error parings UA")
    }
  }

  await db.click.create({ data: { Link: { connect: { id: link.id } }, ua } })
}

const routes = async (req: Request, res: Response) => {
  let slug = req.params[0] as string

  if (slug.startsWith("/")) {
    slug = slug.slice(1)
  }
  if (slug.endsWith("/")) {
    slug = slug.slice(0, -1)
  }

  if (slug.includes("/")) {
    return res.send("This cant be nested, yet")
  }

  const link = await db.link.findOne({ where: { slug } })

  if (link) {
    res.redirect(link.url)
    await saveClick(req, link)
  } else {
    return res.send(`This slug doesn't exist`)
  }
}

export default routes
