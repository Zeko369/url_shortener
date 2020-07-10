import { Head } from "blitz"
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core"
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
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ThemeProvider>
  )
}
