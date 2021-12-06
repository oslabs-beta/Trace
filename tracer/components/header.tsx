import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useColorMode } from '@chakra-ui/react'

type Props = {
  size: string; // lg, md, sm
  text: string;
}

const Header = ({ size, text }: Props) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const [ textColor, setTextColor ] = useState('blue.100');

  const colorChange = () => {
    if (colorMode === 'light') {
        setTextColor('blue.900');
    } else {
        setTextColor('blue.100');
    }
  }

  useEffect(() => {
    colorChange();
  }, [colorMode])
  
  let resize;
  let width;

  switch(size) {
    case 'lg': 
      resize = '2.5em'
      width = '400px'
      break;
    case 'md': 
      resize = '2em'
      width = '300px'
      break;
    case 'sm': 
      resize = '1.5em'
      width = '500px'
      break;
  }

  return (
      <Box 
          fontSize={resize} 
          fontWeight={'bold'} 
          borderRadius="10px"
          w={width}
          mb='1rem'
      >
        <Text fontWeight={'bold'} color={ textColor } display='flex' alignItems='center' >
          {text}
        </Text>
      </Box>
  )
}

export default Header;