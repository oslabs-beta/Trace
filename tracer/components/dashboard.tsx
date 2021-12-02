import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
} from '@chakra-ui/react';
import ResolverGraph from './resolverGraph';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const store = useSelector((state) => state.data);

  const accordianItems = Object.keys(store.averages).map((value, index) => {
    console.log('average: ', value, store.averages[value]);
    if (store.rawdata.hasOwnProperty(value)) {
      return (
        <AccordionItem key={index.toString()} id={index.toString()} p='3'>
          <AccordionButton display='flex' justifyContent='space-between' id={index.toString()}>
            <Flex as="h4" fontSize="lg" fontWeight="medium" justifyContent='space-between' alignItems='center' color='blue-400' >
              {value}
              <Box ml='2' fontSize="sm" borderRadius='20' p='2' pr='4' pl='4' bg='blue.500' color='white'>
                Average duration: {store.averages[value].toFixed(2)}ms
              </Box>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box as="p" fontSize="lg" fontWeight="bold">
              <ResolverGraph data={store.rawdata[value]} />
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