import React from "react"
import QRCode from "qrcode.react"

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

  return (
    <div>
      <h1>Url shortener</h1>
      <QRCode
        id="canvas"
        value="https://zekan.tk/t3"
        size={400}
        renderAs="svg"
        level="H"
        imageSettings={{
          src:
            "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/241/panda_1f43c.png",
          x: null,
          y: null,
          height: 75,
          width: 75,
          excavate: true,
        }}
      />
      <br />
      <button onClick={download}>Download</button>
    </div>
  )
}

export default Home
