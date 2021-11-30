import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Dashboard from '../components/dashboard'
import InnerLayout from "../components/innerlayout"


type Props = {
  data: Array<any>;
  avgData: Object;
}

const Home = ({ rawData, avgData }: Props) => {
  return (
    <>
      <Head>
        <title>Trace</title>
        <meta name="description" content="A lightweight GraphQL resolver tracing tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InnerLayout title='Dashboard'>
        <Dashboard metrics={rawData} averages={avgData} />
      </InnerLayout>
      
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/data`);
  const { rawData, avgData } = await res.json()
  return { props: { rawData, avgData } }
}

export default Home
