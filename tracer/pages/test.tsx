import InnerLayout from "../components/innerlayout"
import Header from "../components/header"

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
      <Header text='Resolver Metrics' size='md' icon={FiGrid}/>
    </InnerLayout>
  )
}

export default Test
