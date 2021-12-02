import InnerLayout from "../components/innerlayout"
import Header from "../components/header"
<<<<<<< HEAD
import ResolverGraph from "../components/resolverMetric"

import {
  FiMenu,
  FiGrid,
  FiBarChart,
  FiAlertTriangle,
  FiShare2,
  FiStar,
  FiSettings
} from 'react-icons/fi'
=======
import ResolverGraph from "../components/resolverGraph"
import Insights from "../components/insights"
>>>>>>> 2eda729 (creating modular graphical insights component)

function Test() {
  return (
    <InnerLayout title='test'>
<<<<<<< HEAD
<<<<<<< HEAD

      <Header text='Resolver Metrics' size='md' icon={FiGrid}/>

=======
      {/* insert testing component here */}
      <Header text='fjladsfjks' size='lg'/>
      {/* <Insights /> */}
>>>>>>> 2eda729 (creating modular graphical insights component)
=======

      <Header text='Resolver Metrics' size='md' icon={FiGrid}/>
      <Insights />
>>>>>>> e9a3c50 (updates on insights.tsx)
    </InnerLayout>
  )
}

export default Test
