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
import { useEffect, useState } from 'react';
import { middleware } from 'graphql-middleware';

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

let graphDataTemplate = {
  labels: [], // each metric object in query array
  datasets: [] // each resolver 
};

function graphDataInit() {
  this.labels = [];
  this.datasets = [];
}

let datasetTemplate = {
  label: '',
  data: [],
  borderWidth: 0,
  minBarLength: 7,
}

const options = {
  indexAxis: 'y',
  barThickness: 20,
  plugins: {
    title: {
      display: true
    },
    tooltip: {
      backgroundColor: 'rgb(178, 190, 219)',
    }
  },
  responsive: true,
  scales: {
    xAxes: {
      position: 'bottom',
      stacked: true,
      ticks: {
        callback: function(value, index, values) {
            return value + 'ms';
        }
      },
    },
    yAxes: {
      stacked: true,
      ticks: {
        callback: function(value, index, values) {
            return '';
        }
      }
    },
  },
};


const ResolverGraph = ({ data }) => {

  const [graphData, setGraphData] = useState(graphDataTemplate);

  const formatData = () => {
    const newData =  new graphDataInit();

    let i = 0;

    for (let obj of data) {
      newData.labels.push(Object.keys(obj)[0]);
      i++;
      let curr = obj;
  
      for (let resolver in curr) {

        if (newData.datasets.length === 0) {
          //newData.labels.push(resolver);
          newData.datasets.push({
            ...datasetTemplate,
            label: resolver,
            data: [curr[resolver]],
            backgroundColor: '#1A365D',
            showLine: true
          }) } else {
            // check if there's a dataset with the same label
            let found = false;
            for (let dataset of newData.datasets) {
              if (dataset.label === resolver) {
                dataset.data.push(curr[resolver]);
                found = true;
                break;
              }
            }

            if (!found) {
              //newData.labels.push(resolver);
              newData.datasets.push({
                ...datasetTemplate,
                label: resolver,
                data: [curr[resolver]],
                backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
              });
            }
          }
      }
    }

    return newData;
  }

  useEffect(() => {
    const newData = formatData();
    setGraphData(newData);
  }, []);

  return (
    <>
      <Bar data={graphData} options={options} />
    </>
  )
}

export default ResolverGraph
