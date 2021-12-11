import { Flex, Box, Heading, Tooltip } from "@chakra-ui/react"

// the flexComponent will take a list of n <= 5 resolver names.
// the flexComenent take n <= 5 numbers no matter what (count or average);
// the flexComponent will render a div where 100% = the highest number (count or average)

// <FlexChild max={highestNum} thispercent={item.number} name={thisQuery}></FlexChild>
// ^^ this is what we recieve


// make an array for multicolors
// get specific with style
// no form has been given yet

const FlexKiddo = ({ max, thisNum, name, label }: any) => {
  let w = thisNum === max ? '100%' : ((thisNum / max) * 100).toString() + '%';
  if (label.length) thisNum = thisNum.toFixed(2);
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
          w = {w}
          h = '100%'
          backgroundColor = 'orange.400'
          borderRadius='1rem'
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default FlexKiddo


// <Tooltip hasArrow label={`${name}: ${thisNum}`} bg='gray.300' color='black'>
// </Tooltip>