import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ResolverData from '../components/resolverdata'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trace</title>
        <meta name="description" content="A lightweight GraphQL resolver tracing tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ResolverData/>
      </main>
      
    </div>
  )
}

export default Home
