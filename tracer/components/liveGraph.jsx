import { useRouter } from 'next/router'
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react"
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  BarElement,
  BarController,
  Legend,
  Title,
  Tooltip
);

import { useSelector } from "react-redux"

const LiveGraph = () => {

  const router = useRouter()

  const handleClick = (i) => {
    console.log(i)
    const href = '/#' + i;
    router.push(href)
  }

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
    onClick: (evt, elem) => {
      const index = elem[0] ? elem[0].index : null;
      handleClick(index);
    },
    backgroundColor: 'white',
    barThickness: 10,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgb(178, 190, 219)',
        titleColor: '#1A365D',
        bodyColor: '#1A365D',
        callbacks: {
          label: function(context) {
              return 'Total Duration: ' + context.parsed.y + 'ms';
          }
        }
      }
    },
    //responsive: true,
    maintainAspectRatio: false,
    onResize: (chart, size) => {
      chart.update();
    },
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
          display: false
        },
        ticks: {
          callback: function(value, index, values) {
              return value + 'ms';
          },
          color: 'white'
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
    <Flex 
      key={router.route}
      w='100%'
      h='300px'
      margin='0'
      padding='2rem'
      backgroundColor='blue.700'
    >
      <Bar
        key={router.route}
        data={chartData}
        options={options}
      />
    </Flex>
    
  )
}

export default LiveGraph