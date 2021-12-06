import { useEffect } from 'react'
import { Flex, SimpleGrid } from '@chakra-ui/layout';

const MetricsTable = ({ data }: any) => {
  const details: Array<any> = [];

  for (let str of Object.keys(data)) {
    if (str === 'trace_id') continue;
    if (str === 'errors') continue;
    else if (str === 'dateAndTime') {
      const old = details[0]
      details[0] = (
        <Flex>
          <p><b>TIMESTAMP:</b> { data[str] }</p>
        </Flex>
      )
      details.push(old)
    }
    else if (str === 'totalDuration') {
      const old = details[1]
      details[1] = (
        <Flex>
          <p><b>TOTAL DURATION:</b> { data[str] }ms</p>
        </Flex>
      )
      details.push(old)
    } else {
      console.log(data[str])
      details.push(
        <Flex>
          <p><b>{ str }:</b> { data[str] }ms</p>
        </Flex>
      )
    }
  }

  return (
    <Flex
      direction='column'
      backgroundColor='rgb(255,255,255,.1)'
      p='1rem'
      fontSize='.8rem'
      color='white'
      mt='1rem'
    >
      { details }
    </Flex>
  )
}

export default MetricsTable