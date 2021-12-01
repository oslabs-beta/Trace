import { GetStaticProps } from 'next'
import Dashboard from '../components/dashboard'
import InnerLayout from "../components/innerlayout";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/action-creators/export'


const Home = ({ data }) => {

  const dispatch = useDispatch();
  const { updateDataActionCreator } = bindActionCreators(actionCreators, dispatch);
  updateDataActionCreator(data);

  //console.log('AVERAGES: ', metricsData);

  return (
    <>
      <InnerLayout title='Dashboard'>
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
