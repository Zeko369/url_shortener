import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import request from "request"

const handler = (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { url } = req.query
  request.get(Array.isArray(url) ? url[0] : url).pipe(res)
}

export default handler
