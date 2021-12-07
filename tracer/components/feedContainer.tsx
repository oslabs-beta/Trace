import { Flex } from "@chakra-ui/layout"
import LiveFeed from "./liveFeed"
import LiveGraph from "./liveGraph"

const FeedContainer = () => {

  return (
    <Flex 
      w='100%' 
      flexFlow='row wrap' 
      justifyContent='space-between'
      
    >
      <LiveGraph />
      <LiveFeed />
    </Flex>
  )
}

export default FeedContainer