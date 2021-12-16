import { useRouter } from 'next/router'
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState, useRef, useMemo } from "react"
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  BarElement,
  BarController,
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

import { useAppSelector } from "../state/hooks"

const LiveGraph = () => {

  const clickRef = useRef(null)

  const router = useRouter()

  const handleClick = (i) => {
    const href = '/#' + i;
    router.push(href)
  }

  const options = {
    onClick: (evt, elem) => {
      const index = elem[0] ? elem[0].index : null;
      handleClick(index);
    },
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

  const [ chartData, setChartData ] = useState({
    labels: [],
    datasets: [{
      id: 1,
      label: 'Traces',
      data: [],
      backgroundColor: []
    }]
  })
  const store = useAppSelector((state) => state)

  useEffect(() => {
    if (store) {
      const data = {
        labels: [],
        datasets: [{
          id: 1,
          label: 'Traces',
          data: [],
          backgroundColor: []
        }]
      }

      for (let obj of store.data.rawdata) {
        if (obj) {
          data.labels.push(obj.trace_id)
          data.datasets[0].data.push(obj.totalDuration);
          if (obj.errors || obj.response.errors) data.datasets[0].backgroundColor.push('#63171B')
          else data.datasets[0].backgroundColor.push('white')
        }
      }
  
      setChartData(data);
      clickRef.current.update();
    }
  }, [store])

  return (
    <Flex 
      key={router.route}
      w='100%'
      h='350px'
      margin='0'
      mb='1rem'
      borderRadius='1rem'
      padding='2rem'
      pt='3rem'
      backgroundColor='blue.700'
      justifyContent='center'
      alignItems='center'
      // ref={clickRef}
    >
      <Bar
        key={router.route}
        data={chartData}
        options={options}
        ref={clickRef}
      />
    </Flex>
    
  )
}

export default LiveGraph