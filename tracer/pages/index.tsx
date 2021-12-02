import { GetStaticProps } from 'next'
import Dashboard from '../components/dashboard'
import Header from '../components/header'
import InnerLayout from "../components/innerlayout"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/action-creators/export'
import { FiGrid } from 'react-icons/fi'
import { useEffect } from 'react'

type Props = {
  data: Object;
}

const Home = ({ data }: Props) => {

  const dispatch = useDispatch();
  const { updateDataActionCreator } = bindActionCreators(actionCreators, dispatch);

  const refreshData = () => {
    updateDataActionCreator(data);
  }

  useEffect(() => {
    refreshData();
  }, [])

  //console.log('AVERAGES: ', metricsData);

  return (
    <>
      <InnerLayout title='Dashboard'>
        <Header size='md' text='Dashboard' icon={FiGrid} />
        <Dashboard />
      </InnerLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/data`);
  const { data } = await res.json()
  return {
    props: {
      data
    }, 
    revalidate: 5
  }
}

export default Home
