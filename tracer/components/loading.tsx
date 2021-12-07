import { Spinner, Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'

const Loading = () => {
  return (
    <Flex
      w='100vw'
      h='100vh'
      direction='column'
      color='white'
      justifyContent='center'
      alignItems='center'
    >
      <Text>Just give us a moment...</Text>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        mt='1rem'
      />
    </Flex>
  )
}

export default Loading