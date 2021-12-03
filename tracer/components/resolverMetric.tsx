import { Flex, Box } from "@chakra-ui/layout";

const ResolverMetric = ({ data }: any) => {
  let max: number = 100;
  let sum: number = Object.values(data).reduce((a: number, b: any) => a + b, 0);
  let resolvers:any[] = [];

  for (let str in data) {
    max = Math.max(max, data[str]);
    if (str !== 'dateAndTime') resolvers.push(
      <Box w={max/sum} backgroundColor='red' ml={2} p={1} fontSize={'.8rem'} >{str}</Box>
    );
  }

  return (
    <Flex w={`${max}%`}>
      <p>{data.dateAndTime}</p>
      { resolvers }
    </Flex>
  )
}

export default ResolverMetric
