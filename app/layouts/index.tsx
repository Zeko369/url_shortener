import { Box, Flex, Text } from "@chakra-ui/core"
import Link from "app/components/Link"

const NavLink = ({ children, ...props }) => (
  <Link px={2} color="white" {...props}>
    {children}
  </Link>
)

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Flex bg="Gray" w="100%" px={5} py={4} justifyContent="space-between" alignItems="center">
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Link href="/">
            <Text pl={3} color="white">
              URL shortener
            </Text>
          </Link>
        </Flex>
        <Box>
          <NavLink href="/">Home</NavLink>
        </Box>
      </Flex>
      <Box w="90%" maxW="1080px" margin="0 auto">
        {children}
      </Box>
    </>
  )
}

export default Layout
