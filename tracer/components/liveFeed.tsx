import { Flex, Container, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { Key, useState } from "react"
import ResolverMetric from "./resolverMetric"

const LiveFeed = ({ data }: any) => {

  const items = data.map((obj: Object, i: Key) => {
    return <ResolverMetric data={obj} key={i.toString()} />
  });

  

  return (
    <>
      { items }
    </>
  )
}

export default LiveFeed