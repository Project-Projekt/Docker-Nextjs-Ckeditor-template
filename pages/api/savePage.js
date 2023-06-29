import prisma from '../../lib/prisma'

export default async function savePage(req, res) {

    const pageData = req.body

    const page = await prisma.pages.upsert({
        where: {title: pageData.title},
        update: {
            thumbnail: pageData.thumbnail,
            text: pageData.text
        },
        create: {
            title: pageData.title,
            thumbnail: pageData.thumbnail,
            text: pageData.text,
        }
    })
    res.status(200).json({ status: 'success' })
  }
  