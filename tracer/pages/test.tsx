import InnerLayout from "../components/innerlayout"
import Header from "../components/header"
import ResolverGraph from "../components/resolverGraph"

function Test() {
  return (
    <InnerLayout title='test'>
      {/* insert testing component here */}
      <Header text='fjladsfjks' size='lg'/>
      <ResolverGraph/>
    </InnerLayout>
  )
}

export default Test
