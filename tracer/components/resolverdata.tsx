
const ResolverData = ({ data }:any) => {
  return (
    <div>
      {data}
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/resolvers`)
  const data = await res.json()
  console.log('data', data);
  // Pass data to the page via props
  return { props: { data } }
}

export default ResolverData