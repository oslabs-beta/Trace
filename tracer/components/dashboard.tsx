import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex
} from '@chakra-ui/react';
import ResolverGraph from './resolverGraph';

type Props = {
  metrics: Array<any>;
  averages: any;
}

const Dashboard = ({ metrics, averages }: Props) => {
  const accordianItems = Object.keys(averages).map((value, index) => {
    return (
      <AccordionItem key={index}>
        <AccordionButton display='flex' justifyContent='space-between'>
          <Flex as="h3" fontSize="lg" fontWeight="bold" justifyContent='space-between'>
            {value} | {averages[value]}ms
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Box as="p" fontSize="lg" fontWeight="bold">
            <ResolverGraph />
          </Box>
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <Accordion>
      {accordianItems}
    </Accordion>
  )
}

export default Dashboard