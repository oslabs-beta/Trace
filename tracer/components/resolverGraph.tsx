import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

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
import { useEffect } from 'react';

Chart.register(
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
);

const graphDataTemplate: ChartData<"bar"> = {
  labels: [], // each metric object in query array
  datasets: [] // each resolver 
};

type ChartDataSets = {
  label?: string | undefined;
  data?: Array<number | null | undefined | number[]> | undefined;
  backgroundColor?: string[] | string | undefined;
  borderColor?: string[] | string | undefined;
  borderWidth?: number | number[] | undefined;
  showLine?: boolean | undefined;
}

type Options = {
  responsive?: boolean | undefined;
  plugins?: any | undefined;
  indexAxis: any | string | undefined;
  scales: any | undefined;
}

const datasetTemplate: ChartDataSets = {
  label: '',
  data: [],
  borderWidth: 1,
}

const options: Options= {
  indexAxis: 'y',
  plugins: {
    title: {
      display: true,
      //text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      position: 'bottom',
      stacked: true,
      ticks: {
        callback: function(value, index, values) {
            return value + 'ms';
        }
      }
    },
    y: {
      stacked: true,
      ticks: {
        callback: function(value, index, values) {
            return '';
        }
      }
    },
  },
};


const ResolverGraph = ({ data }: any) => {

  const graphData = { ...graphDataTemplate };
  let i = 0;

  console.log('Resolver', data);

  for (let obj of data) {
    graphData.labels.push(i.toString());
    i++;
    //console.log(obj);
    let curr = obj;

    for (let resolver in curr) {
      if (graphData.datasets.length === 0) {
        graphData.datasets.push({
          ...datasetTemplate,
          label: resolver,
          data: curr[resolver],
          backgroundColor: 'blue.900',
          showLine: true
        }) } else {
          graphData.datasets.includes(resolver) ? graphData.datasets[resolver].data.push(curr[resolver]) : graphData.datasets.push({
            ...datasetTemplate,
            label: resolver,
            data: curr[resolver],
            backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
          });
        }
    }
  }
  console.log(graphData);

  return (
    <div>
      <Bar data={graphData} options={options}/>
    </div>
  )
}

export default ResolverGraph
