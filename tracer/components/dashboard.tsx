import LiveFeed from "./liveFeed"
import { useSelector } from "react-redux"
import { Flex, Container, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { Key, useState } from "react"

const Dashboard = () => {
  const store = useSelector((state) => state)
  const [ view, setView ] = useState('live')

  return (
    <Container 
      bg='blue.900' 
      w={'100%'} 
      h={'90%'}
      p={'1em'} 
      m={0} 
      maxW={'1000px'}
      overflowY='scroll'
    >
      <Flex>
        <Button colorScheme='blue' m='.4rem' onClick={() => setView('live')}>Incoming Resolvers</Button>
        <Button colorScheme='blue' m='.4rem' onClick={() => setView('avg')}>Resolvers Averages</Button>
      </Flex>

      <Flex direction='column' >
      <Heading size='l' p='1rem' >LIVE FEED</Heading>
      
      </Flex>
    </Container>
  )
}

export default Dashboard