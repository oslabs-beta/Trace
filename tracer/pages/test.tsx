import InnerLayout from "../components/innerlayout"
import Header from "../components/header"
import ResolverGraph from "../components/resolverGraph"
import Insights from "../components/insights"
import InsightsOptions from '../components/insightsoptions'

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
      <InsightsOptions />
      <Header text='Resolver Metrics' size='md' icon={FiGrid}/>
      {/* <Insights /> */}
    </InnerLayout>
  )
}

export default Test
