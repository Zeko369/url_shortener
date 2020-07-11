import React, {
  Suspense,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  ForwardRefRenderFunction,
} from "react"
import { useQuery, BlitzPage } from "blitz"
import {
  List,
  ListItem,
  Stack,
  Heading,
  Code,
  Flex,
  Button,
  Text,
  IconButton,
  useClipboard,
  IconButtonProps,
} from "@chakra-ui/core"
import { useForm } from "react-hook-form"

import { Link } from "db"
import getLinks from "app/queries/links/getLinks"
import ErrorBoundary from "app/components/ErrorBoundary"
import useToggle from "app/hooks/useToggle"
import createLink from "app/queries/links/createLink"
import deleteLink from "app/queries/links/deleteLink"
import Input from "app/components/Input"
import ChakraLink, { LinkIconButton } from "app/components/Link"
import config from "config"

type LinkDB = Link & {
  clicks: {
    id: number
  }[]
}
type LinksDB = LinkDB[]

interface LinksListHandlers {
  refetch(data?: { throwOnError?: boolean }): Promise<LinksDB>
}

interface LinkItemProps {
  link: LinkDB
  remove: () => void
}

const buttonProps = (icon: string): IconButtonProps => ({
  size: "sm",
  "aria-label": icon,
  icon: icon as any,
})

const LinkItem: React.FC<LinkItemProps> = ({ link, remove }) => {
  const { onCopy } = useClipboard(`${config.baseUrl}/${link.slug}`)

  return (
    <Stack isInline>
      <Flex justify="space-between" w="100%" mb={2}>
        <Text>
          <ChakraLink href="/links/[id]" as={`/links/${link.id}`}>
            {link.slug}
          </ChakraLink>{" "}
          ={">"} {link.url} ({link.clicks.length})
        </Text>
        <Stack isInline>
          <IconButton {...buttonProps("delete")} variantColor="red" onClick={remove} />
          <LinkIconButton
            {...buttonProps("qrcode")}
            variantColor="green"
            href={`/?slug=${link.slug}`}
            as={`/?slug=${link.slug}`}
          />
          <IconButton {...buttonProps("copy")} variantColor="orange" onClick={onCopy} />
        </Stack>
      </Flex>
    </Stack>
  )
}

const LinksListComponent: ForwardRefRenderFunction<LinksListHandlers, {}> = (_props, ref) => {
  const [links, { refetch }] = useQuery(getLinks, {})
  useImperativeHandle(ref, () => ({ refetch }))

  const remove = (id: number) => () => {
    if (window.confirm("Can I delete this")) {
      deleteLink(id)
        .then(() => refetch())
        .catch((err) => console.error(err))
    }
  }

  return links.length === 0 ? (
    <Text fontSize="1.25em">No links</Text>
  ) : (
    <List>
      {links.map((link) => (
        <ListItem key={link.id}>
          <LinkItem link={link} remove={remove(link.id)} />
        </ListItem>
      ))}
    </List>
  )
}

const LinksList = forwardRef(LinksListComponent)

interface FormProps {
  url: string
  slug?: string
}

const Links: BlitzPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showNew, toggleNew] = useToggle()
  const { register, handleSubmit, reset } = useForm()

  const ref = useRef<LinksListHandlers | null>(null)

  const onSubmit = async ({ url, slug }: FormProps) => {
    setLoading(true)
    try {
      await createLink({ url, slug })
      reset()
      await ref.current.refetch()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack>
      <Flex justify="space-between" align="center">
        <Heading>Links</Heading>
        <Button onClick={toggleNew}>{showNew ? "Hide" : "Show"} new</Button>
      </Flex>

      {showNew && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input name="url" ref={register()} placeholder="URL" label="URL" isRequired />
            <Input name="slug" ref={register()} placeholder="Slug" label="Slug" />
            <Button type="submit" isLoading={loading}>
              Add
            </Button>
          </Stack>
        </form>
      )}

      <ErrorBoundary
        fallback={(error) => (
          <Stack>
            <Heading>Error...</Heading>
            <Code>{JSON.stringify(error)}</Code>
          </Stack>
        )}
      >
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <LinksList ref={ref} />
        </Suspense>
      </ErrorBoundary>
    </Stack>
  )
}

export default Links
