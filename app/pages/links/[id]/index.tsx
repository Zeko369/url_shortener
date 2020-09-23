import React, { Suspense, useState } from "react"
import { useQuery, BlitzPage, useParam } from "blitz"
import { List, ListItem, Stack, Heading, Code, Flex, Text, Button } from "@chakra-ui/core"
import { Link } from "chakra-next-link"

import ErrorBoundary from "app/components/ErrorBoundary"
import getLink from "app/queries/links/getLink"

const parseUA = (ua: string) => {
  if (ua.includes("(") && ua.includes("(")) {
    return ua.slice(ua.indexOf("(") + 1, ua.indexOf(")"))
  }
  return ua
}

const LinkData: React.FC = () => {
  const [showFull, setShowFull] = useState<boolean>(false)

  const id = useParam("id", "number")
  const [link] = useQuery(getLink, { id })

  return (
    <Stack>
      <Text>Slug: {link.slug}</Text>
      <Text>
        Link:{" "}
        <Link href={link.url} target="_blank" rel="noreferrer">
          {link.url}
        </Link>
      </Text>
      <Stack isInline align="center">
        <Heading size="md">Clicks:</Heading>
        <Button size="xs" onClick={() => setShowFull((v) => !v)}>
          {showFull ? "Expand full UA" : "Hide full UA"}
        </Button>
      </Stack>
      {link.clicks.length > 0 ? (
        <List>
          {link.clicks.map((click) => (
            <ListItem>
              <code>{new Date(click.createdAt).toLocaleString()}</code>
              {` => ${showFull ? click.ua : parseUA(click.ua)}`}
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No links :(</Text>
      )}
    </Stack>
  )
}

const Links: BlitzPage = () => {
  return (
    <Stack>
      <Flex justify="space-between" align="center">
        <Heading>Links</Heading>
      </Flex>

      <ErrorBoundary
        fallback={(error) => (
          <Stack>
            <Heading>Error...</Heading>
            <Code>{JSON.stringify(error)}</Code>
          </Stack>
        )}
      >
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <LinkData />
        </Suspense>
      </ErrorBoundary>
    </Stack>
  )
}

export default Links
