import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import formidable from "formidable";
const fs = require('fs')

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
    return NextResponse.json({ error: {message: "There was an error uploading the file"} })
  }

  const filePath = files.upload[0].filepath
  let fileName = files.upload[0].originalFilename
  const data = fs.readFileSync(filePath);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location

  fileName = randomUUID() + fileName
  const path = `./public/uploads/${fileName}`
  await writeFile(path, data)

  response.status(200).json({ url: `http://localhost:3000/uploads/${fileName}` })
}
