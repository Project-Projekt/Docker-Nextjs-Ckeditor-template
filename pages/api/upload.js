import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import formidable from "formidable";
const fs = require('fs')
const crypto = require('crypto')

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(request, response) {
  const form = formidable({})
  let [fields, files] = await form.parse(request)

  if (!files) {
    console.log('no file!')
    return NextResponse.json({ error: { message: "There was an error uploading the file" } })
  }

  const filePath = files.upload[0].filepath
  let fileName = files.upload[0].originalFilename
  const data = fs.readFileSync(filePath);


  const digest = crypto.createHash("sha256").update('secretkey').digest('base64') // hash the image so we can match based on image content
  fileName = digest + '_' + fileName
  let allUploads = fs.readdirSync('./public/uploads')

  if (allUploads.includes(fileName)) {
    response.status(200).json({ url: `http://localhost:3000/uploads/${fileName}` })
  } else {
    const path = `./public/uploads/${fileName}`
    await writeFile(path, data)
    response.status(200).json({ url: `http://localhost:3000/uploads/${fileName}` })
  }
}
