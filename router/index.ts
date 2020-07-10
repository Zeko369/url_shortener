import { join } from "path"
import express from "express"
import { config } from "dotenv"

import db from "../db"
import { asyncMiddleware } from "./lib/async"

config({ path: join(__dirname, "../.env") })
const app = express()

app.get(
  "*",
  asyncMiddleware(async (req, res) => {
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
    }

    return res.send(`This slug doesn't exist`)
  })
)

app.listen(3001, () => {
  console.log("Listening on http://localhost:3001")
})
