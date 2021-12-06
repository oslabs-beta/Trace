import { Container } from "@chakra-ui/layout";
import { useEffect, useState } from "react"
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";

const LiveGraph = () => {
  const data = {
    labels: [],
    datasets: [
      {
        id: 1,
        label: 'Traces',
        data: [],
      }
    ],
  }

  const options = {
    maintainAspectRatio: true,
    barThickness: 10,
    plugins: {
      legend: {
        labels: {
          color: 'blue.400',
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgb(178, 190, 219)',
        titleColor: '#1A365D',
        bodyColor: '#1A365D',
      }
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        position: 'bottom',
        stacked: true,
        ticks: {
          callback: function(value) {
              return '';
          },
          color: '#8e94ab'
        },
      },
      y: {
        grid: {
          color: '#8e94ab'
        },
        stacked: true,
        ticks: {
          callback: function(value, index, values) {
              return value + 'ms';
          },
          color: '#8e94ab'
        }
      },
    },
  };

  const [ chartData, setChartData ] = useState(data)
  const store = useSelector((state) => state)

  useEffect(() => {
    for (let obj of store.data.rawdata) {
      data.labels.push(obj.trace_id)
      data.datasets[0].data.push(obj.totalDuration);
    }

    setChartData(data);
  }, [store])

  return (
    <Container 
      maxW='600px' 
      w='50%' 
      alignSelf='flex-start'
      margin='0'
      padding='3rem'
      backgroundColor='blue.700'
    >
      <Bar
        data={chartData}
        options={options}
      />
    </Container>
    
  )
}

export default LiveGraph