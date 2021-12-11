import '../styles/globals.css'
import Layout from '../components/layout'
import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme/theme'
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from '../state/store'
import Loading from '../components/loading'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react'
import { useAppDispatch } from '../state/hooks'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/action-creators/export'
import io from 'socket.io-client'

function MyApp({ Component, pageProps, router }: AppProps) {
  const [ newData, setData ] = useState(null);

  // SOCKET IO
  useEffect(() => {
    fetch('http://localhost:2929/socketio').finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log(socket.id, 'index.tsx: connected')
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
  const dispatch = useAppDispatch();
  const { updateDataActionCreator } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (newData !== null) {
      console.log('new data updated');
      updateDataActionCreator(newData);
    }
  }, [ newData, updateDataActionCreator ])

  const store: any = useStore()

  return process.browser ? (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PersistGate persistor={store.__persistor} loading={<Loading />} >
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
            }}
            transition={{ duration: .7 }}
          > 
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </motion.div>
        </PersistGate>
      </ChakraProvider>
    </Provider>
  ) : (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PersistGate persistor={store} loading={<Loading />} >
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
            }}
            transition={{ duration: .7 }}
          > 
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </motion.div>
        </PersistGate>
      </ChakraProvider>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)