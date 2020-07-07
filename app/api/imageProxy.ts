import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import request from "request"

const handler = (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { url } = req.query
  const proxyUrl = Array.isArray(url) ? url[0] : url
  request.get(proxyUrl).pipe(res)
}

export default handler
