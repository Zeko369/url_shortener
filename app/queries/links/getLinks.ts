import db from "db"

const getLinks = async () => {
  const links = await db.link.findMany({ include: { clicks: { select: { id: true } } } })
  return links
}

export default getLinks
