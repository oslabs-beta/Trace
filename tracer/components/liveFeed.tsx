import { Box, Flex } from "@chakra-ui/layout"
import { Key } from "react"
import { useSelector } from "react-redux"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@chakra-ui/react'
import ResolverMetric from "./resolverMetric"
import MetricsTable from "./metricsTable"

const LiveFeed = () => {

  const store = useSelector(state => state)
  const data = store.data.rawdata;

  const items = data.map((obj: Object, i: Key) => {
    return (
      <AccordionItem w='100%' border='none'>
        <h1>
          <AccordionButton>
            <Box width='100%'>
            <ResolverMetric id={i.toString()} data={obj} key={i.toString()} />
            {/* <AccordionIcon /> */}
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
      h='auto'
      w='100%'
      backgroundColor='blue.500'
      overflowX='auto'
      overflowY='scroll'
      direction='column'
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