import { Flex, Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

const ResolverMetric = ({ data }: any) => {
  let max: number = 100;
  const [ sum, setSum ] = useState(1)
  let resolvers:any[] = [];

  useEffect(() => {
    let preSum = Object.keys(data).reduce((a: number, b: string) => {
      if (b !== 'dateAndTime') {
        max = Math.max(max, data[b])
        return a + data[b];
      } else return a;
    }, 0);

    setSum(preSum);
  }, [])

  for (let str in data) {
    if (str !== 'dateAndTime') {
      max = Math.max(max, data[str]);
      console.log(max);
      resolvers.push(
        <Box 
          w={data[str]/sum} 
          backgroundColor='red' 
          ml={2} 
          p={1} 
          fontSize={'.8rem'} 
          h='1rem'
          _hover={{opacity: '80%'}}
        >
          {str}
        </Box>
      );
    }
  }

  return (
    <Flex w={`${max}%`} alignItems='center' justifyContent='center'>
      <p>{data.dateAndTime}</p>
      { resolvers }
    </Flex>
  )
}

export default ResolverMetric
