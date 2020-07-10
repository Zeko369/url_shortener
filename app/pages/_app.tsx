import { Head, AppProps } from "blitz"
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core"
import Layout from "app/layouts"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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

export default MyApp
