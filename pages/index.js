import { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Editor from "../components/Editor";

export default function Home() {

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [title, setTitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleThumbnailChange = async (event) => {
    let formData = new FormData()
    formData.append('upload', event.target.files[0])
    let fileName = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',

      body: formData
    }).then(response => response.json())

    setThumbnail(fileName.url)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HI! Welcome to <a href="https://nextjs.org">Next.js</a> on Docker!
        </h1>

          <input type="test" name="title" placeholder='Page Title' value={title} onChange={event => setTitle(event.target.value)} />
          <input type="file" name="thumbnail" onChange={handleThumbnailChange} />
          <Editor
            name="description"
            onChange={(data) => {
              setData(data);
            }}
            editorLoaded={editorLoaded}
          />

          {JSON.stringify(data)}

          <button onClick={() => {
            let pageData = {
              title: title,
              thumbnail: thumbnail,
              text: data
            }
            let response = fetch("http://localhost:3000/api/savePage", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(pageData)
            })
          }}>Save Page</button>


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
