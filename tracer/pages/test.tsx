import InnerLayout from "../components/innerlayout"
import Header from "../components/header"
import ResolverGraph from "../components/resolverGraph"
import Insights from "../components/insights"

import {
  FiMenu,
  FiGrid,
  FiBarChart,
  FiAlertTriangle,
  FiShare2,
  FiStar,
  FiSettings
} from 'react-icons/fi'

function Test() {
  return (
    <InnerLayout title='test'>
<<<<<<< HEAD
      {/* insert testing component here */}
      <Header text='fjladsfjks' size='lg'/>
      {/* <Insights /> */}
=======

      <Header text='Resolver Metrics' size='md' icon={FiGrid}/>

>>>>>>> a3082fdaf7939603866b83e448d3d65e09533b79
    </InnerLayout>
  )
}

export default Test
