type Props = {
  metrics: Array<any>
}

const ResolverData = ({ metrics }: Props) => {
  const data = metrics[0].fullQuery;
  let formattedData = [];

  for (let index in data) {
    formattedData.push(<h2>{data[index].parentType}</h2>)
  }

  return (
    <div>
      <h1>resolver data</h1>
      {formattedData}
    </div>
  )
}

export default ResolverData