import { useAppSelector } from '../state/hooks';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const Averages = () => {
  const store = useAppSelector((state) => state);
  const resolverData = store.data;
  console.log('averages.tsx || store: ', store);

  // iterate through resolverData
  // set count variable for resolvers of same type
  // sum duration and find average for resolvers of same type
  // save averages as object { resolverName: averageDuration }

  const tableData = [];
  
  let totalSum = 0;
  let totalCount = 0;
  let totalAverage;

  // if no resolver data set total average to 0
  totalCount === 0 ? totalAverage = 0 : totalAverage = totalSum / totalCount;

  for (let resolver in resolverData.averages) {
    tableData.push(
      <Tr>
        <Td color='#F7F7F7'>{ resolver }</Td>
        <Td isNumeric color='#F7F7F7'>{ resolverData.averages[resolver].toFixed(2) } <i>ms</i></Td>
      </Tr>
    )
    // calculate total sum and count for total average
    totalSum += resolverData.averages[resolver] * resolverData.count[resolver];
    totalCount += resolverData.count[resolver];
  }
  totalAverage = totalSum / totalCount;


  return (
    <Table variant='simple' color='#F7F9FA' backgroundColor='blue.700' borderRadius='1rem'>
      <Thead >
        <Tr >
          <Th borderTopLeftRadius='1rem' backgroundColor='blue.500' pt='1rem' pb='1rem' color='FEFEFE' fontSize='1rem'>Resolver Name</Th>
          <Th borderTopRightRadius='1rem' backgroundColor='blue.500' pt='1rem' pb='1rem' color='FEFEFE' isNumeric fontSize='1rem'>Average Duration</Th>
        </Tr>
      </Thead>
      <Tbody>
         { tableData }
      </Tbody>
      <Tfoot>
        <Tr>
          <Th pt='1rem' pb='1rem' color='FEFEFE' fontSize='1rem'>Average Execution Time</Th>
          <Td pt='1rem' pb='1rem' color='FEFEFE' fontSize='1rem' isNumeric>{ totalAverage.toFixed(2) } <i>ms</i></Td>
        </Tr>
      </Tfoot>
    </Table>
  )

}

export default Averages;