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

  // create table elements with resolver and corresponding average
  for (let resolver in resolverData.averages) {
    tableData.push(
      <Tr>
        <Td>{ resolver }</Td>
        <Td isNumeric>{ resolverData.averages[resolver].toFixed(2) } <i>ms</i></Td>
      </Tr>
    )
    
    // calculate total sum and count for total average
    // totalSum += resolverData.averages[resolver] * resolverData.count[resolver];
    // totalCount += resolverData.count[resolver];
  }

  // create table element for total resolver average
  // iterate through resolverData 


  return (
    <Table variant='simple' colorScheme=''>
      <Thead>
        <Tr>
          <Th>Resolver Name</Th>
          <Th isNumeric>Average Duration</Th>
        </Tr>
      </Thead>
      <Tbody>
         { tableData }
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Average Execution Time</Th>
          {/* <Th isNumeric>{calculateTA}</Th> */}
        </Tr>
      </Tfoot>
    </Table>
  )

}

export default Averages;