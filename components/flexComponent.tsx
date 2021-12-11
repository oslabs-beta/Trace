import { Flex, Box, Heading, Tooltip } from "@chakra-ui/react"

// make an array for multicolors
// get specific with style
// no form has been given yet

type FlexComponentProps = {
  max: number,
  thisNum: number | string,
  name: string,
  label: string
}

const FlexComponent = ({ max, thisNum, name, label }: FlexComponentProps) => {
  const graphWidth = thisNum === max ? '100%' : ((Number(thisNum) / max) * 100).toString() + '%';
  if (label.length) thisNum = Number(thisNum).toFixed(2);
  return (
    // flex container that represents the entire width of the graph
    <Flex direction='column' mt={'1rem'}>
      <Heading 
        size='xs'
        mb='.5rem'
      >
        {name}
      </Heading>
      <Flex 
        direction='row'
        h='1.5rem'
        w = {'100%'} // was previously {max}
        backgroundColor = 'white'
        borderRadius='1rem'
      >
        <Tooltip hasArrow label={`${name}: ${thisNum} ${label}`} bg='gray.300' color='black'>
          <Box
          w = {graphWidth}
          h = '100%'
          backgroundColor = 'orange.400'
          borderRadius='1rem'
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default FlexComponent