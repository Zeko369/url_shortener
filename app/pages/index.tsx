import React, { useState, useEffect, useCallback } from "react"
import QRCode from "qrcode.react"
import { Button, Input, Stack, Heading, Text, SimpleGrid, Box } from "@chakra-ui/core"
import handler from "app/queries/getEmoji"

export interface Emoji {
  name: string
  url: string
}

const ranges = [
  "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
  "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
  "\ud83d[\ude80-\udeff]", // U+1F680 to U+1F6FF
  " ", // Also allow spaces
].join("|")

const Home: React.FC = () => {
  const download = () => {
    const canvas = document.getElementById("canvas")

    document
      .querySelectorAll("#qr > img")
      .forEach((elem) => elem.setAttribute("origin", "anonymous"))

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
  const [emojiChar, setEmoji] = useState<string>("🐼")
  const [emojis, setEmojis] = useState<Emoji[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [emojiUrl, setEmojiUrl] = useState<string | undefined>()
  const [showEmojis, setShowEmojis] = useState<boolean>(false)

  const findEmoji = (e) => {
    setLoading(true)
    handler(e)
      .then(setEmojis)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  const removeEmoji = useCallback((str: string) => str.replace(new RegExp(ranges, "g"), ""), [])
  const isOnlyEmojis = useCallback((str) => true || !removeEmoji(str).length, [removeEmoji])

  const use = (url: string) => () => {
    setEmojiUrl(url)
    setPanda(true)
    setShowEmojis(false)
  }

  const urlImg = `/api/imageProxy?url=${
    emojiUrl ||
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/238/panda-face_1f43c.png"
  }`

  return (
    <>
      <Button onClick={() => setShowEmojis((e) => !e)}>Toggle</Button>
      {showEmojis ? (
        <Stack>
          <Input mb={3} value={emojiChar} onChange={(e) => setEmoji(e.target.value)} />
          <Button
            onClick={() => findEmoji(emojiChar)}
            isDisabled={!isOnlyEmojis(emojiChar) || emojiChar.trim() === ""}
          >
            Find emoji
          </Button>
          {!isOnlyEmojis(emojiChar) && <Text color="red.600">That's not an emoji</Text>}

          {loading && <Heading>Loading...</Heading>}

          {emojis && (
            <SimpleGrid minChildWidth="120px" spacing="40px">
              {emojis.map((emoji) => (
                <Box>
                  {emoji.name}
                  <img src={emoji.url} alt={emoji.name + emojiChar} />
                  <Button onClick={use(emoji.url)}>Use this</Button>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Stack>
      ) : (
        <Stack>
          <Heading>Url shortener</Heading>
          <Input mb={3} value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button onClick={() => setPanda((p) => !p)}>Toggle panda</Button>
          <div id="qr">
            <QRCode
              id="canvas"
              value={url}
              size={400}
              renderAs="canvas"
              level="H"
              imageSettings={
                panda
                  ? {
                      src: urlImg,
                      x: null,
                      y: null,
                      height: 75,
                      width: 75,
                      excavate: true,
                    }
                  : undefined
              }
            />
          </div>
          <br />
          <Button onClick={download}>Download</Button>
        </Stack>
      )}
    </>
  )
}

export default Home
