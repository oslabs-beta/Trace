import InnerLayout from "../components/innerlayout"
import Header from "../components/header"
import ResolverGraph from "../components/resolverGraph"

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
      {/* insert testing component here */}
<<<<<<< HEAD
      <Header text='fjladsfjks' size='lg'/>
      <ResolverGraph/>
=======
      <Header text='Resolver Metrics' size='md' icon={FiGrid}/>
>>>>>>> c268873 (header updates 12/1)
    </InnerLayout>
  )
}

export default Test
