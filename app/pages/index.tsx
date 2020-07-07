/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react"
import QRCode from "qrcode.react"
import {
  Button,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/core"
import emojiRegex from "emoji-regex"
import handler from "app/queries/getEmoji"
import Input from "app/components/Input"
import useToggle from "app/hooks/useToggle"

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

const download = (slug: string) => {
  const canvas: HTMLCanvasElement | null = document.querySelector("#qr > canvas")

  if (canvas) {
    const pngUrl = canvas.toDataURL("image/octet-stream")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `qr-${slug}.png`

    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  const [url, setUrl] = useState<string>("https://zekan.tk/t3")
  const [emojiChar, setEmoji] = useState<string>("🐼")
  const [emojis, setEmojis] = useState<Emoji[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [emojiUrl, setEmojiUrl] = useState<string | undefined>()

  const [showEmoji, toggleEmoji, setShowEmoji] = useToggle()
  const [customSection, toggleCustomSection] = useToggle()
  const [useCustomImage, toggleCustomImage] = useToggle()

  const findEmoji = (e) => {
    setLoading(true)
    handler(getEmoji(e))
      .then(setEmojis)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  const urlImg = (forceUrl?: string) => {
    return forceUrl || customImage || emojiUrl
      ? `/api/imageProxy?url=${useCustomImage ? customImage : forceUrl || emojiUrl}`
      : "/panda.png"
  }

  const use = (url: string) => () => {
    setEmojiUrl(url)
    setShowEmoji(false)

    const image = new Image()
    image.src = urlImg(url)
    image.onload = () => setShowEmoji(true)

    setTabIndex(0)
  }

  const [customImage, setCustomImage] = useState<string>("")
  const [aspect, setAspect] = useState<number>(1)

  return (
    <>
      <Heading>Url shortener</Heading>
      <Tabs index={tabIndex} onChange={setTabIndex}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Emoji</Tab>
        </TabList>

        <TabPanels mt={3}>
          <TabPanel>
            <Stack spacing={3}>
              <Input name="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
              <Stack spacing={3} isInline>
                <Button onClick={toggleEmoji} variantColor="green">
                  Toggle emoji
                </Button>
                <Button onClick={toggleCustomSection}>
                  {customSection ? "Hide" : "Show"} custom section
                </Button>
              </Stack>

              {customSection && (
                <Stack spacing={3}>
                  <Input
                    name="Aspect ratio"
                    value={aspect}
                    onChange={(e) => setAspect(e.target.value)}
                    type="number"
                  />
                  <Input
                    name="Custom image URL"
                    value={customImage}
                    onChange={(e) => setCustomImage(e.target.value)}
                  />
                  <Button onClick={toggleCustomImage} isDisabled={!customImage}>
                    {useCustomImage ? "Custom image" : "From emoji"}
                  </Button>
                </Stack>
              )}
              <div id="qr">
                <QRCode
                  value={url}
                  size={400}
                  level="H"
                  includeMargin
                  imageSettings={
                    showEmoji
                      ? {
                          src: urlImg(),
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
              <Button onClick={() => download("Slug")} variantColor="blue">
                Download
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack>
              <Input
                name="Emoji"
                mb={3}
                value={emojiChar}
                onChange={(e) => setEmoji(e.target.value)}
              />
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Home
