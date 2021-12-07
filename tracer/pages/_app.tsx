import '../styles/globals.css'
import Layout from '../components/layout'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme/theme'
import { Provider } from 'react-redux';
import { store } from '../state/store';
// import { PersistGate } from 'redux-persist/integration/react'
import { storePersistor } from '../state/store'

function MyApp({ Component, pageProps }: AppProps) {

  // const { store, persistor } = storePersistor();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        {/* </PersistGate> */}
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp