import Header from '../components/header'
import { Flex } from '@chakra-ui/layout'

const Settings = () => {
  return (
    <Flex direction='column' w='90%' h='100vh' p='1.5rem' m='1rem' overflowY='scroll' >
      <Header size='sm' text='Settings' />
    </Flex>
  )
}

export default Settings