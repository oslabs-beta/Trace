// successful resolver executes
// failing resolver executions

// donut chart
// const myData = [{angle: 1}, {angle: 5}, {angle: 2}]
// label property to show details
// sublabel annotations
// color optional
// innerRadius to build donut chart
// labelsAboveChildren
// showLabels

const MetricTracker = () => {
  return (
    <div>
      <RadialChart
        data={myData}
        width={300}
        height={300} />
    </div>
  )
}

export default MetricTracker
