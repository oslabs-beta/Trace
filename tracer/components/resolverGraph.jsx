import { Bar } from 'react-chartjs-2';
import { useLayoutEffect } from 'react';
import Chart from 'chart.js/auto';

// type Props = {
//   metrics: Array<any>;
// }

const dummyData = {
  labels: [], // each metric object in query array
  datasets: [] // each resolver 
};

const datasetTemplate = {
label: '',
data: [],
borderWidth: 1,
}

const sampleData = {
  "Query.getUsers": [
    {"Query.getUsers":99.48,"User.username":0.01,"totalDuration":99.68},
    // {"Query.getUsers":24.75,"User.username":0.02,"totalDuration":25.21},
    // {"Query.getUsers":29.85,"User.username":0.03,"totalDuration":30.1},
    // {"Query.getUsers":120.39,"User.username":0.06,"totalDuration":120.98},
    // {"Query.getUsers":44.24,"User.username":0.01,"totalDuration":44.4},
    // {"Query.getUsers":22.49,"User.username":0.01,"totalDuration":22.61},
    // {"Query.getUsers":20.82,"User.username":0.01,"totalDuration":20.89},
    // {"Query.getUsers":30.37,"User.username":0.01,"totalDuration":30.51},
    // {"Query.getUsers":19.5,"User.username":0.02,"totalDuration":19.87},
    // {"Query.getUsers":20.39,"User.username":0.01,"totalDuration":20.51},
    // {"Query.getUsers":22.05,"User.username":0.03,"totalDuration":22.21},
    // {"Query.getUsers":22.95,"User.username":0.01,"totalDuration":23.06},
    // {"Query.getUsers":21.51,"User.username":0.01,"totalDuration":21.59},
    // {"Query.getUsers":20.69,"User.username":0.01,"totalDuration":20.8},
    // {"Query.getUsers":21.64,"User.username":0.01,"totalDuration":21.72},
    // {"Query.getUsers":22.48,"User.username":0.01,"totalDuration":22.61},
    // {"Query.getUsers":32.17,"User.username":0.02,"totalDuration":32.32},
  ]
}

const options = {
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
        // Include a dollar sign in the ticks
        callback: function(value, index, values) {
            return value + 'ms';
        }
      }
    },
    y: {
      stacked: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: function(value, index, values) {
            return '';
        }
      }
    },
  },
};



const ResolverGraph = () => {
  useLayoutEffect(() => {
    sampleData["Query.getUsers"].forEach((dataObject, index) => {
      dummyData.labels.push(index.toString());
      // loop through each key/value pair in dataObject
      Object.keys(dataObject).forEach((key, index) => {
        if (key === 'totalDuration') return;
        if (dummyData.datasets.length === 0) {
          dummyData.datasets.push({
            ...datasetTemplate,
            label: key,
            data: [dataObject[key]],
            backgroundColor: 'rgb(255, 99, 132)',
            showLine: true
          }) } 
        else {
          let i = 0;
          let found = false;
          while (i < dummyData.datasets.length) {
            if (dummyData.datasets[i].label === key) {
              found = true;
              dummyData.datasets[i].data.push(dataObject[key]);
              break;
            }
              i++
          }
    
          if (!found) {
            dummyData.datasets.push({
              ...datasetTemplate,
              label: key,
              data: [dataObject[key]],
              backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
            })
          }
        }
    
      });
    });
    console.log(dummyData)
  }, [])

  return (
    <div>
      <Bar data={dummyData} options={options}/>
    </div>
  )
}

export default ResolverGraph
