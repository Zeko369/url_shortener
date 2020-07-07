import db from "db"

const getLinks = async () => {
  const links = await db.link.findMany()
  return links
}

export default getLinks
