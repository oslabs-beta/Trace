import { Flex, Box } from "@chakra-ui/layout";
import { Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from "react";

const ResolverMetric = ({ data, id }: any) => {
  let max: number = 100;
  const [ sum, setSum ] = useState(1)
  const [ errors, setErrors ] = useState(false)
  let resolvers:any[] = [];

  useEffect(() => {
    if (data) {
      if (data.errors) setErrors(true);
      else if (data.response.errors) setErrors(true);
      let preSum = Object.keys(data).reduce((a: number, b: string) => {
        if (b !== 'errors' && b !== 'dateAndTime' && b !== 'totalDuration' && b !== 'trace_id' && b !== 'response') {
          max = Math.max(max, data[b])
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
    if (index === 5) index = 0;

    max = Math.max(max, data[str]);
    resolvers.push(
      <Tooltip hasArrow label={`${str}: ${data[str]}ms`} bg='gray.300' color='black' key={index.toString()}>
        <Box 
          id={index.toString()}
          key={index.toString()}
          w={data[str]/sum}
          minWidth='100px'
          backgroundColor={errors === true ? errColors[index] : colors[index]} 
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
        </Box>
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
        minWidth='160px'
        maxWidth='160px'
        textAlign='center'
        color='white'
        // mb='1rem'
        // mr='1rem' 
      >{data.trace_id}</Flex>
      { resolvers }
    </Flex>
  )
}

export default ResolverMetric
