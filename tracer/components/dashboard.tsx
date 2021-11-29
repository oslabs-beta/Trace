
type Props = {
  metrics: Array<any>
}

const Dashboard = ({ metrics }: Props) => {
  const formattedData = metrics.map((obj, i) => {
    const data = obj.fullQuery;
    let rootQuery;
    let overallDuration;
    //const returnValue = re-work the logic to send back query results
    let formattedData = [];

    for (let [key, value] of Object.entries(data)) {
      if (key === "0") rootQuery = value.fieldName;
      if (key === "finalMetrics") {
        overallDuration = value.duration;
        continue;
      }
      formattedData.push(
        <>
          <p>{value.parentType}.{value.fieldName}: {value.duration}ms</p>
        </>
      );
    }

    return (
      //! turn into its own component later + one for pop-out graph 
      <>
        <div className='resolver-data'>
          <h1>{rootQuery}: {overallDuration}ms</h1>
        </div>
        <div className='resolver-graph'>
          {formattedData}
        </div>
      </>
    )
  });

  return (
    <div>
      <h1>Resolver Data</h1>
      {formattedData}
    </div>
  )
}

export default Dashboard