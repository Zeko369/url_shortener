import { join } from "path"
import express from "express"
import { config } from "dotenv"

import { asyncMiddleware } from "./lib/async"
import routes from "./controllers/routes"

config({ path: join(__dirname, "../.env") })
const app = express()

app.get("*", asyncMiddleware(routes))

app.listen(3001, () => {
  console.log("Listening on http://localhost:3001")
})
