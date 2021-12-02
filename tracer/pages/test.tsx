import InnerLayout from "../components/innerlayout"
import Header from "../components/header"
import ResolverGraph from "../components/resolverGraph"
import Insights from "../components/insights"

function Test() {
  return (
    <InnerLayout title='test'>
      {/* insert testing component here */}
      <Header text='fjladsfjks' size='lg'/>
      {/* <Insights /> */}
    </InnerLayout>
  )
}

export default Test
