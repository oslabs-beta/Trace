import Dashboard from '../components/dashboard'
import Header from '../components/header'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/action-creators/export'
import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/layout'
import io from 'socket.io-client'

const Home = () => {
  const [ newData, setData ] = useState(null);

  // SOCKET IO
  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('index.tsx: connected')
      })

      socket.on('data', data => {
        setData(data);
      })

      socket.on('disconnect', () => {
        console.log('index.tsx: disconnect')
      })
    })
  }, [])

  // REDUX
  const dispatch = useDispatch();
  const { updateDataActionCreator } = bindActionCreators(actionCreators, dispatch);
  
  const refreshData = () => {
    updateDataActionCreator(newData);
  };

  useEffect(() => {
    if (newData !== null) {
      console.log('new data updated');
      refreshData();
    }
  }, [ newData ])

  return (
    <Flex direction='column' w='90vw' h='90vh' p='1.5rem' m='1rem' >
      <Header size='sm' text='Dashboard' />
      <Dashboard />
    </Flex>
  )
}

export default Home
