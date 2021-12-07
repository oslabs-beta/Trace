import '../styles/globals.css'
import Layout from '../components/layout'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme/theme'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import returnStoreAndPersistor from '../state/store'
import Loading from '../components/loading'
import { motion } from 'framer-motion';

function MyApp({ Component, pageProps, router }: AppProps) {

  const { store, persistor } = returnStoreAndPersistor();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PersistGate loading={<Loading />} persistor={persistor}>
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

export default MyApp