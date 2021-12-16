import FeedContainer from "./feedContainer"
import GraphContainer from './graphContainer'
import Averages from './averages'
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
      onClick={() => setView('res')}
      isActive={ view === 'res' }
      >
        Resolver Average View
      </Button>
      <Button colorScheme='blue'   
      onClick={() => setView('in')}
      isActive={ view === 'in' }
      >
        Insights
      </Button>
    </ButtonGroup>

    <Flex
      direction='column'
    >

      { view === 'live' ? <FeedContainer /> : 
        view === 'res' ? <Averages /> : <GraphContainer />}

    </Flex>
    </>
  )
}

export default Dashboard