import Dashboard from '../components/dashboard'
import Header from '../components/header'
import { Flex } from '@chakra-ui/layout'
import Head from 'next/head'

const Home = () => {

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" />
      </Head>
      <Flex direction='column' w='90%' h='100vh' p='1.5rem' m='1rem' overflowY='scroll' >
        <Header size='sm' text='Dashboard' />
        <Dashboard />
      </Flex>
    </>
  )
}

export default Home
