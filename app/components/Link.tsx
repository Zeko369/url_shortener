import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Button,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/core"
import { Link as NextLink } from "blitz"

interface LinkProps extends Omit<ChakraLinkProps, "as"> {
  as?: string
}

const Link: React.FC<LinkProps> = ({ as, href, children, ...props }) => {
  return (
    <NextLink href={href} as={as}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

interface LinkButtonProps extends Omit<ChakraButtonProps, "as"> {
  href: string
  as?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ as, href, children, ...props }) => {
  return (
    <NextLink href={href} as={as}>
      <Button {...props}>{children}</Button>
    </NextLink>
  )
}

export default Link
export { LinkButton }
