import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'

const Averages = (props: any) => {
  const resolverData = props.data;

  // iterate through resolverData
  // set count variable for resolvers of same type
  // sum duration and find average for resolvers of same type
  // save averages as object { resolverName: averageDuration }

  const tableData = [];

  for (let resolver in resolverAverages) {
    tableData.push(
      <Tr>
        <Td>{ resolver }</Td>
        <Td isNumeric>{ resolverAverages[resolver] }</Td>
      </Tr>
    )
  }

  return (
    <Table variant='simple' colorScheme=''>
      <TableCaption placement='top'>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Resolver Name</Th>
          <Th isNumeric>Average Duration</Th>
        </Tr>
      </Thead>
      <Tbody>
        { ...tableData }
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Total Average</Th>
          <Th isNumeric>{calculateTA}</Th>
        </Tr>
      </Tfoot>
    </Table>
  )

}

export default Averages;