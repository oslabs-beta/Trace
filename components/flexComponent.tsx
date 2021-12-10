import { Flex, Box } from "@chakra-ui/react"

// the flexComponent will take a list of n <= 5 resolver names.
// the flexComenent take n <= 5 numbers no matter what (count or average);
// the flexComponent will render a div where 100% = the highest number (count or average)

// <FlexChild max={highestNum} thispercent={item.number} name={thisQuery}></FlexChild>
// ^^ this is what we recieve


// make an array for multicolors
// get specific with style
// no form has been given yet

const FlexKiddo = ({ max, thisNum, name }: any) => {
  return (
    // flex container that represents the entire width of the graph
    <Flex 
    w = {max} // OR just '100%'
    color = 'red.500'
    br = '20px'
    >
      <Box
      w = {thisNum}
      h = '100%'
      align = 'flex-end' 
      >
        {name}
      </Box>
    </Flex>
  )
}

export default FlexKiddo
