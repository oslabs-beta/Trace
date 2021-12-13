import { Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import logo from '../public/T.png'

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
          mb='1.2rem'
          alignItems='center'
      >
        <Image
          src={logo}
          alt="Trace"
          width='50px'
          height='50px'
          placeholder="blur"
        />
        <Text fontFamily={'Montserrat'} fontSize='2rem' mt='.5rem' mr='.8rem' ml='0.5rem'>TRACE</Text>
        <Text fontWeight={'thin'} fontSize='2rem'>|</Text>
        <Text fontWeight={'thin'} color='blue.100' ml='.8rem' mt='0.5rem'>
          {text}
        </Text>
      </Flex>
  )
}

export default Header;