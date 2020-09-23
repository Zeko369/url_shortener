import { Box, Flex, useColorMode, Button, Heading } from "@chakra-ui/core"
import { Link } from "chakra-next-link"

const NavLink: React.FC<Record<string, unknown> & { href: string }> = ({ children, ...props }) => (
  <Link px={2} color="white" {...props}>
    {children}
  </Link>
)

const Layout: React.FC = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Flex bg="Gray" w="100%" px={5} py={4} justifyContent="space-between" alignItems="center">
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Link href="/">
            <Heading size="lg" pl={3} pr={3} color="white">
              URL shortener
            </Heading>
          </Link>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/links">Links</NavLink>
        </Flex>
        <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
      </Flex>
      <Box w="90%" maxW="1080px" margin="0 auto">
        {children}
      </Box>
    </>
  )
}

export default Layout
