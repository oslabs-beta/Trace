import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
        This is the main content
      </main>

      <footer className={styles.footer}>
        This is the footer
      </footer>
    </div>
  )
}

export default Home
