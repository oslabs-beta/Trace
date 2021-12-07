import FeedContainer from "./feedContainer"
import { useState } from 'react'
import { Button, ButtonGroup, Flex } from "@chakra-ui/react"
import { Chart as ChartJS, BarController, BarElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(BarController, BarElement, LinearScale, Title, CategoryScale);


const Dashboard = () => {
  const [ view, setView ] = useState('live')

  return (
    <>
    <ButtonGroup mt='.4rem' mb='2rem' isAttached pos='-webkit-sticky'>
      <Button colorScheme='blue'  
      onClick={() => setView('live')}
      isActive={ view === 'live' }
      >
        Live Tracing Feed
      </Button>
      <Button colorScheme='blue' 
      onClick={() => setView('root')}
      isActive={ view === 'root' }
      >
        Group By Root Operation
      </Button>
      <Button colorScheme='blue'   
      onClick={() => setView('res')}
      isActive={ view === 'res' }
      >
        Group By Resolver
      </Button>
    </ButtonGroup>

    <Flex
      direction='column'
    >

      { view === 'live' ? <FeedContainer /> : 
        view === 'root' ? <p>Sort By Root Operation</p> : <p>Sort by Resolver</p> }

    </Flex>
    </>
  )
}

export default Dashboard