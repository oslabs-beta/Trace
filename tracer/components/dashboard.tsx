import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex
} from '@chakra-ui/react';
import { Key } from 'readline';

type Props = {
  metrics: Array<any>;
  averages: any;
}

const Dashboard = ({ metrics, averages }: Props) => {
  const accordianItems = Object.keys(averages).map((value, index) => {
    return (
      <AccordionItem key={index}>
        <AccordionButton>
          <Flex as="h3" fontSize="lg" fontWeight="bold">
            {value}
            {averages[value]}
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Box as="p" fontSize="lg" fontWeight="bold">
            this is where the graph will go
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