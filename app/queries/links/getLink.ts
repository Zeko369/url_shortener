import db from "db"

const getLink = async ({ id }: { id: number }) => {
  const link = await db.link.findOne({ where: { id }, include: { clicks: true } })
  return link
}

export default getLink
