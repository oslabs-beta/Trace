import { Flex, Box } from "@chakra-ui/layout";
import { Tooltip } from '@chakra-ui/react'
import { useEffect, useState, useRef } from "react";

const ResolverMetric = ({ data, id }: any) => {
  let max = useRef(100);
  const [ sum, setSum ] = useState(1)
  const [ errors, setErrors ] = useState(false)
  let resolvers:any[] = [];

  useEffect(() => {
    if (data) {
      if (data.errors) setErrors(true);
      else if (data.response.errors) setErrors(true);
      let preSum = Object.keys(data).reduce((a: number, b: string) => {
        if (b !== 'errors' && b !== 'dateAndTime' && b !== 'totalDuration' && b !== 'trace_id' && b !== 'response') {
          max.current = Math.max(max.current, data[b])
          return a + data[b];
        } else return a;
      }, 0);
  
      setSum(preSum);
    }
  }, [data])

  const colors = ['orange.300', 'orange.400', 'orange.500', 'orange.600', 'orange.700'];
  const errColors = ['red.500', 'red.600', 'red.700', 'red.800', 'red.900'];
  let index = 0;
  const filteredData = Object.keys(data).filter(key => (
    key !== 'dateAndTime' && key !== 'totalDuration' && key !== 'trace_id' && key !== 'errors' && key !== 'response'
  ));

  for (let str of filteredData) {
    let color = index % 5

    max.current = Math.max(max.current, data[str]);
    resolvers.push(
      <Tooltip hasArrow label={`${str}: ${data[str]}ms`} bg='gray.300' color='black' key={index.toString()}>
        <Flex 
          alignItems='center'
          justifyContent='center'
          id={index.toString()}
          key={index.toString()}
          w={data[str]/sum}
          minWidth='75px'
          backgroundColor={errors === true ? errColors[color] : colors[color]} 
          p={1} 
          fontSize={'.6rem'} 
          color='white'
          fontWeight='bold'
          h='1.5rem'
          _hover={{backgroundColor: 'blue.800'}}
          ml={index === 0 ? '1rem' : '0'}
          borderTopLeftRadius={index === 0 ? '1rem' : 0}
          borderBottomLeftRadius={index === 0 ? '1rem' : 0}
          borderTopRightRadius={index === filteredData.length - 1 ? '1rem' : 0}
          borderBottomRightRadius={index === filteredData.length - 1 ? '1rem' : 0}
        >
          {str}
        </Flex>
      </Tooltip>
    );
    
    index++;
  }

  return (
    <Flex alignItems='center'>
      <Flex
        id={id}
        justifyContent='center'
        // backgroundColor='blue.100'
        fontSize='.5rem'
        fontWeight='700'
        borderRadius='1rem'
        // minWidth='160px'
        // maxWidth='160px'
        textAlign='center'
        color='white'
      >{data.trace_id}</Flex>
      { resolvers }
    </Flex>
  )
}

export default ResolverMetric
