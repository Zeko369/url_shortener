import React, { useState } from "react"
import QRCode from "qrcode.react"
import { Button, Input, Stack, Heading, Text, SimpleGrid, Box } from "@chakra-ui/core"
import emojiRegex from "emoji-regex"
import handler from "app/queries/getEmoji"

export interface Emoji {
  name: string
  url: string
}

const getEmoji = (s: string) => {
  const regex = emojiRegex()
  const emoji = regex.exec(s)

  if (emoji === null) {
    return null
  }

  return emoji[0]
}

const isEmoji = (s: string) => {
  return getEmoji(s) !== null
}

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
    handler(getEmoji(e))
      .then(setEmojis)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  const use = (url: string) => () => {
    setEmojiUrl(url)
    setPanda(true)
    setShowEmojis(false)
  }

  const [customImage, setCustomImage] = useState<string>("")
  const [aspect, setAspect] = useState<number>(1)
  const [useCustomImage, setUseCustomImage] = useState<boolean>(false)

  const urlImg =
    customImage || emojiUrl
      ? `/api/imageProxy?url=${useCustomImage ? customImage : emojiUrl}`
      : "/panda.png"

  return (
    <>
      <Text>{String(isEmoji(emojiChar))}</Text>
      <Button onClick={() => setShowEmojis((e) => !e)}>Toggle</Button>
      {showEmojis ? (
        <Stack>
          <Input mb={3} value={emojiChar} onChange={(e) => setEmoji(e.target.value)} />
          <Button
            onClick={() => findEmoji(emojiChar)}
            isDisabled={!isEmoji(emojiChar) || emojiChar.trim() === ""}
          >
            Find emoji
          </Button>
          {!isEmoji(emojiChar) && <Text color="red.600">That's not an emoji</Text>}

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
          <Input mb={3} value={aspect} onChange={(e) => setAspect(e.target.value)} type="number" />
          <Input mb={3} value={customImage} onChange={(e) => setCustomImage(e.target.value)} />
          <Button onClick={() => setUseCustomImage((p) => !p)}>
            {useCustomImage ? "Custom image" : "From emoji"}
          </Button>
          <div id="qr">
            <QRCode
              id="canvas"
              value={url}
              size={400}
              renderAs="canvas"
              level="H"
              includeMargin
              imageSettings={
                panda
                  ? {
                      src: urlImg,
                      x: null,
                      y: null,
                      height: 60,
                      width: 60 * (aspect || 1),
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
