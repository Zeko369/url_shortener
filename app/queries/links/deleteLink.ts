import db from "db"

const deleteLink = async (id: number) => {
  const link = await db.link.delete({ where: { id } })
  return link
}

export default deleteLink
