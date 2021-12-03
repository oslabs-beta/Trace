import { Flex, Container } from "@chakra-ui/layout"
import { Key, useState } from "react"
import ResolverMetric from "./resolverMetric"

const LiveFeed = ({ data }: any) => {

  const items = data.map((obj: Object, i: Key) => {
    return <ResolverMetric data={obj} key={i.toString()} />
  });

  return (
    <Flex 
      bg='blue.100' 
      p='1em'
      m='.4rem'
      mt='1rem'
      h='81%'
      borderRadius='10'
      overflowY='scroll'
    >

      <Flex direction='column' flex='1' alignItems='center' >
      <Flex
        direction='column'
        borderRadius='10'
        bg='rgb(255,255,255, 0.5)'
        p='1em'
        m='.4rem'
        h='100%'
        w='100%'
        overflowX='clip'
        overflowY='scroll'
      >
        { items }
      </Flex>
      </Flex>
    </Flex>
  )
}

export default LiveFeed