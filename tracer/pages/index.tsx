import { GetStaticProps } from 'next'
import Dashboard from '../components/dashboard'
import Header from '../components/header'
import InnerLayout from "../components/innerlayout"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/action-creators/export'
import { FiGrid } from 'react-icons/fi'
import { useEffect, useState } from 'react'
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
    <InnerLayout title='Dashboard'>
      <Header size='md' text='Dashboard' icon={FiGrid} />
      <Dashboard />
    </InnerLayout>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(`http://localhost:3000/api/data`);
//   const { data } = await res.json()
//   return {
//     props: {
//       data
//     }, 
//     revalidate: 5
//   }
// }

export default Home
