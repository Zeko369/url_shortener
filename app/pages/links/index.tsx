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
  Input,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/core"
import { useForm } from "react-hook-form"

import { Link } from "db"
import getLinks from "app/queries/links/getLinks"
import ErrorBoundary from "app/components/ErrorBoundary"
import useToggle from "app/hooks/useToggle"
import createLink from "app/queries/links/createLink"
import deleteLink from "app/queries/links/deleteLink"

interface LinksListHandlers {
  refetch(data?: { throwOnError?: boolean }): Promise<Link[]>
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

  return (
    <List>
      {links.map((link) => (
        <ListItem key={link.id}>
          {link.slug} ={">"} {link.url}
          <IconButton icon="delete" onClick={remove(link.id)} aria-label="delete" />
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
            <FormControl isRequired>
              <FormLabel htmlFor="url">URL</FormLabel>
              <Input id="url" name="url" ref={register()} isRequired placeholder="URL" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="slug">Slug</FormLabel>
              <Input id="slug" name="slug" ref={register()} placeholder="Slug" />
            </FormControl>

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
