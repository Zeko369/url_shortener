import { Head } from "blitz"
import { ThemeProvider, CSSReset, DarkMode, ColorModeProvider } from "@chakra-ui/core"
import Layout from "app/layouts"

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Head>
          <title>URL shortener</title>
        </Head>
        <CSSReset />
        <Layout>
          <DarkMode>
            <Component {...pageProps} />
          </DarkMode>
        </Layout>
      </ColorModeProvider>
    </ThemeProvider>
  )
}
