import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Dashboard from '../components/dashboard'
import styles from '../styles/Home.module.css'

type Props = {
  data: Array<any>
}

const Home = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trace</title>
        <meta name="description" content="A lightweight GraphQL resolver tracing tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Dashboard metrics={data} />
      </main>
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/data`)
  const data = await res.json()
  return { props: { data } }
}

export default Home
