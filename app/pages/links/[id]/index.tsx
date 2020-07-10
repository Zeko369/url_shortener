import React, { Suspense } from "react"
import { useQuery, BlitzPage, useParam } from "blitz"
import { List, ListItem, Stack, Heading, Code, Flex, Text } from "@chakra-ui/core"

import ErrorBoundary from "app/components/ErrorBoundary"
import getLink from "app/queries/links/getLink"
import Link from "app/components/Link"

const LinkData: React.FC = () => {
  const id = useParam("id", "number")
  const [link] = useQuery(getLink, { id })

  console.log(link.clicks)

  return (
    <Stack>
      <Text>Slug: {link.slug}</Text>
      <Text>
        Link:{" "}
        <Link href={link.url} target="_blank" rel="noreferrer">
          {link.url}
        </Link>
      </Text>
      <Heading size="md">Clicks:</Heading>
      {link.clicks.length > 0 ? (
        <List>
          {link.clicks.map((click) => (
            <ListItem>{new Date(click.createdAt).toLocaleString()}</ListItem>
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
