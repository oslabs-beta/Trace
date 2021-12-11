import { Flex, Text } from '@chakra-ui/react'

type Props = {
  size: string; // lg, md, sm
  text: string;
}

const Header = ({ size, text }: Props) => {
  
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
      <Flex 
          fontSize={resize} 
          w={width}
          mb='1rem'
          alignItems='center'
      >
        <Text fontFamily='serif' fontSize='3rem' mr='.8rem'>trace </Text>
        <Text fontWeight={'thin'} fontSize='2rem'>|</Text>
        <Text fontWeight={'thin'} color='blue.100' ml='.8rem' pt='.6rem'>
          {text}
        </Text>
      </Flex>
  )
}

export default Header;