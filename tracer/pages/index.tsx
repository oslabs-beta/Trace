import { GetStaticProps } from 'next'
import Dashboard from '../components/dashboard'
import InnerLayout from "../components/innerlayout"
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/action-creators/export'
import { useEffect } from 'react';


const Home = ({ data }) => {

  const dispatch = useDispatch();
  const { updateDataActionCreator } = bindActionCreators(actionCreators, dispatch);
  updateDataActionCreator(data);
  const metricsData = useSelector((state) => state.data.averages);

  //console.log('AVERAGES: ', metricsData);

  return (
    <>
      <InnerLayout title='Dashboard'>
        {/* <Dashboard data={data} /> */}
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
