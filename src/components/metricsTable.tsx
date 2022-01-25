import { useEffect } from 'react'
import { Flex } from '@chakra-ui/layout';

const MetricsTable = ({ data }: any) => {

  const details: Array<any> = [];
  let response: string | undefined;
  let errors: string = '';

  for (let str of Object.keys(data)) { 
    if (str === 'trace_id') continue;
    if (str === 'errors') {
      errors += JSON.stringify(data[str]);
    } else if (str === 'response') {
      if (data[str].data) response = JSON.stringify(data[str].data)
      if (data[str].errors) errors += JSON.stringify(data[str].errors)
    } else if (str === 'dateAndTime') {
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
      details.push(
        <Flex>
          <p><b>{ str }:</b> { data[str] }ms</p>
        </Flex>
      )
    }
  }

  details.push(
    <Flex direction='column'>
      <p><b>RESULT:</b> {response}</p>
      { errors ? <p><b>ERRORS:</b> <span style={{ backgroundColor: '#63171B' }}>{errors}</span></p>
      : null }
    </Flex>
  )

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