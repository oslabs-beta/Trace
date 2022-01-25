import { Box, Flex } from "@chakra-ui/layout"
import { Key } from "react"
import { useAppSelector } from '../state/hooks'
import {
  Table,
  Thead,
  Tr,
  Th,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@chakra-ui/react'
import ResolverMetric from "./resolverMetric"
import MetricsTable from "./metricsTable"

const LiveFeed = () => {

  const store = useAppSelector(state => state)
  const data = store.data.rawdata;

  const items = data.map((obj: Object, i: Key) => {
    return (
      <AccordionItem w='100%' border='none' key={i.toString()} >
        <h1>
          <AccordionButton>
            <Box width='100%'>
            <ResolverMetric id={i.toString()} data={obj}/>
            </Box>
          </AccordionButton>
        </h1>
        <AccordionPanel pb={4}>
          <MetricsTable data={obj}/>
        </AccordionPanel>
      </AccordionItem>
    )
  });

  return (
    <Flex
      p='3rem'
      w='100%'
      borderRadius='1rem'
      backgroundColor='blue.500'
      direction='column'
      mb='3rem'
    >
      <Table mb='1rem' >
        <Thead>
          <Tr >
            <Th textAlign='center' width='200px' color='blue.800' >Trace ID</Th>
            <Th textAlign='center' color='blue.800' >Duration Metrics</Th>
          </Tr>
        </Thead>
      </Table>
      <Flex
        direction='column'
        alignItems='flex-start'
      >
      <Accordion w='100%' allowMultiple allowToggle>
        {items}
      </Accordion>
      </Flex>
    </Flex>
    
  )
}

export default LiveFeed