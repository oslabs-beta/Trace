import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  IconButton
} from '@chakra-ui/react';
import ResolverGraph from './resolverGraph';
import { useSelector } from 'react-redux';

// Feather Icon Imports
import { FiMinusCircle } from 'react-icons/fi';

const Dashboard = () => {
  const store = useSelector((state) => state.data);
  console.log('Store in Dashboard Component: ', store);

  const accordianItems = Object.keys(store.averages).map((value, index) => {
    if (store.rawdata.hasOwnProperty(value)) {
      return (
        <AccordionItem key={index}>
          <AccordionButton display='flex' justifyContent='space-between'>
            <Flex as="h3" fontSize="lg" fontWeight="bold" justifyContent='space-between' alignItems='center'>
              <IconButton
                aria-label='This is the button to delete this query on the dashboard.'
                background="none"
                _hover={{ background: 'none' }}
                icon={<FiMinusCircle />}
                onClick={() => {
                  console.log('Delete!')
                }}
                style={ { alignItems: 'center' }}
              /> {value} | {store.averages[value]}ms
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box as="p" fontSize="lg" fontWeight="bold">
              <ResolverGraph data={store.rawdata[value]}/>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      );
    }
  });

  return (
    <Accordion w='100%' >
      {accordianItems}
    </Accordion>
  )
}

export default Dashboard