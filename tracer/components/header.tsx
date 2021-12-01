import { Box, Text, Icon } from '@chakra-ui/react'

type Props = {
  size: string; // lg, md, sm
  text: string;
  icon: any;
}

const Header = ({ size, text, icon}: Props) => {
  
  let resize;
  let dividerSize;
  let width;

  switch(size) {
    case 'lg': 
      resize = '2.5em'
      dividerSize = '21em'
      width = '400px'
      break;
    case 'md': 
      resize = '2em'
      dividerSize = '17em'
      width = '300px'
      break;
    case 'sm': 
      resize = '1.5em'
      dividerSize = '13em'
      width = '500px'
      break;
  }

  return (
      <Box 
          fontSize={resize} 
          fontWeight={'bold'} 
          color='white' 
          bg='blue.900'
          borderRadius="10px"
          w={width}
          p={'.5em'}
          mb={'1em'}
      >
        <Text fontWeight={'bold'} color='white' display='flex' alignItems='center' >
          <Icon as={icon} fontSize="l" color="white" mr={'.5em'} />
          {text}
        </Text>
      </Box>
  )
}

export default Header;