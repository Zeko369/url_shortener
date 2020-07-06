import React, { useState, useEffect } from "react"
import QRCode from "qrcode.react"
import { Button, Input } from "@chakra-ui/core"

const Home: React.FC = () => {
  const download = () => {
    const canvas = document.getElementById("canvas")

    if (canvas) {
      const pngUrl = (canvas as any)
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
      let downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "qr.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  const [url, setUrl] = useState<string>("https://zekan.tk/t3")
  const [panda, setPanda] = useState<boolean>(false)

  return (
    <div>
      <h1>Url shortener</h1>
      <Input mb={3} value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button onClick={() => setPanda((p) => !p)}>Toggle panda</Button>
      <QRCode
        id="canvas"
        value={url}
        size={400}
        renderAs="canvas"
        level="H"
        imageSettings={
          panda && {
            src:
              "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/241/panda_1f43c.png",
            x: null,
            y: null,
            height: 75,
            width: 75,
            excavate: true,
          }
        }
      />
      <br />
      <Button onClick={download}>Download</Button>
    </div>
  )
}

export default Home
