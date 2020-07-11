import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Button,
  ButtonProps as ChakraButtonProps,
  IconButton,
  IconButtonProps as ChakraButtonIconProps,
} from "@chakra-ui/core"
import { Link as NextLink } from "blitz"

export interface LinkProps extends Omit<ChakraLinkProps, "as"> {
  as?: string
}

const LinkingComponent: React.FC<{ as?: string; href: string }> = ({
  as,
  href,
  children,
  ...props
}) => {
  if (!as || href.startsWith("http")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} as={as}>
      {children}
    </NextLink>
  )
}

const Link: React.FC<LinkProps> = ({ as, href, children, ...props }) => {
  return (
    <LinkingComponent href={href} as={as} {...props}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </LinkingComponent>
  )
}

export interface LinkButtonProps extends Omit<ChakraButtonProps, "as"> {
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

export interface LinkButtonIconProps extends Omit<ChakraButtonIconProps, "as"> {
  href: string
  as?: string
}

const LinkIconButton: React.FC<LinkButtonIconProps> = ({ as, href, children, ...props }) => {
  return (
    <NextLink href={href} as={as}>
      <IconButton {...props}>{children}</IconButton>
    </NextLink>
  )
}

export default Link
export { LinkButton, LinkIconButton }
