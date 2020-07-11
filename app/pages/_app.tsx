import { Head, AppProps } from "blitz"
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core"
import Layout from "app/layouts"
import theme from "app/theme"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
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
