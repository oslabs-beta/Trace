import { Flex } from "@chakra-ui/layout"
import { Key, useEffect } from "react"
import LiveGraph from "./liveGraph"
import ResolverMetric from "./resolverMetric"

const LiveFeed = ({ data }: any) => {

  const items = data.map((obj: Object, i: Key) => {
    return <ResolverMetric data={obj} key={i.toString()} />
  });

  return (
    <Flex 
      w='100%' 
      flexFlow='column nowrap' 
      justifyContent='space-between'
    >
      <LiveGraph />
      <Flex
        direction='column'
        bg='rgb(255,255,255, 0.5)'
        p='3rem'
        h='100%'
        w='100%'
        overflowX='clip'
        overflowY='scroll'
        backgroundColor='blue.500'
      >
        { items }
      </Flex>
    </Flex>
  )
}

export default LiveFeed