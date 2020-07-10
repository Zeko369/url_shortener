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
} from "@chakra-ui/core"
import { useForm } from "react-hook-form"

import { Link } from "db"
import getLinks from "app/queries/links/getLinks"
import ErrorBoundary from "app/components/ErrorBoundary"
import useToggle from "app/hooks/useToggle"
import createLink from "app/queries/links/createLink"
import deleteLink from "app/queries/links/deleteLink"
import Input from "app/components/Input"
import ChakraLink, { LinkButton } from "app/components/Link"

type LinksDB = (Link & {
  clicks: {
    id: number
  }[]
})[]

interface LinksListHandlers {
  refetch(data?: { throwOnError?: boolean }): Promise<LinksDB>
}

const LinksListComponent: ForwardRefRenderFunction<LinksListHandlers, {}> = (_props, ref) => {
  const [links, { refetch }] = useQuery(getLinks, {})
  useImperativeHandle(ref, () => ({ refetch }))

  const remove = (id: number) => () => {
    if (window.confirm("Can I delete this")) {
      // mutate((current) => current.filter((l) => l.id !== id))
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
          <Stack isInline>
            <Text>
              <ChakraLink href="/links/[id]" as={`/links/${link.id}`}>
                {link.slug}
              </ChakraLink>{" "}
              ={">"} {link.url} ({link.clicks.length})
            </Text>
            <IconButton
              variantColor="red"
              icon="delete"
              onClick={remove(link.id)}
              aria-label="delete"
              mb={2}
            />
            <LinkButton variantColor="green" href={`/?slug=${link.slug}`}>
              QR
            </LinkButton>
          </Stack>
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

  const onSubmit = ({ url, slug }: FormProps) => {
    setLoading(true)
    createLink({ url, slug })
      .then(() => {
        reset()
        ref.current.refetch()
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
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
