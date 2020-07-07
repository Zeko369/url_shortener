import db, { LinkCreateInput } from "db"

const letter = () => String.fromCharCode(Math.floor(Math.random() * 26 + 97))

const createLink = async (data: LinkCreateInput) => {
  let { slug, url } = data

  if (!slug) {
    slug = Array.from(new Array(5), letter).join("")
  }

  const link = await db.link.create({ data: { slug, url } })
  return link
}

export default createLink
