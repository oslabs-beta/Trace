import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

/*
::NON-ESSENTIAL INSIGHTS TO ADD LATER::
switch (context.TFA.render) {
  case true:
    if (components >= 3) return
    components++
    //useSelector and create
}

switch (context.ADA.render) {
  case true:
    if (components >= 3) return
    components++
    //useSelector and create
}
*/

/* 
    Insights:
    Top Query by Frequency: TQF
    Average Query Duration: AQD
    Top Operations by Frequency: TOF
    Average Operation Duration: AOD
    Top Frequency of All: TFA
    Average Duration of All: ADA
*/

const graphs = (context, rawdata, averages, count) => {
  // take in the context object
  // and create the graphs
  const cards = [];
  function OptionsInit() {
    this.options = {
      indexAxis: 'y',
      barThickness: 25,
      elements: {
        bar: {
          borderWidth: 1,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: null,
        },
        title: {
          display: true,
          text: '',
        },
      },
    };
  }
  
  function GraphDataInit() {
    this.data = {
        labels:[],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
        }]
      }
    }
  
    
  switch (context.TQF.render) {
    case true:
      // init the list to a variable
      let j = context.TQF.list;
      // init an array to be sorted
      const sortable = [];
      // add objects into that array
      for (const query in count) {
        if (rawdata[query]) sortable.push([query, count[query]]);
      }
      // sort the array in numerical order (descending)
      sortable.sort(function(a, b) {
          return b[1] - a[1];
      });
      // console.log('and she\'s SORTABLE', sortable);
      // compile labels & metrics for as many entries as the user selected
      const labels = [];
      const metrics = [];
      const bgColors = [];
      if (sortable.length < j) j = sortable.length;
      for (let i = 0; i < j; i++) {
        if (!sortable[i]) break;
        bgColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        labels.push(sortable[i][0]);
        metrics.push(sortable[i][1]);
      }; 
      const TQF = new OptionsInit();
      TQF.options.plugins.title.text = `Top ${j} Queries by Frequency`;
      const TQFData = new GraphDataInit();
      TQFData.data.labels = labels;
      TQFData.data.datasets[0].data = metrics;
      TQFData.data.datasets[0].backgroundColor = bgColors;
    cards.push(<Bar data={TQFData.data} options={TQF.options}/>) 
    break;
  };

  switch (context.AQD.render) {
    case true:
      let j = context.AQD.list;
      const sortable = [];
      for (const query in averages) {
          if (rawdata[query]) sortable.push([query, averages[query]]);
      }
      sortable.sort(function(a, b) {
          return b[1] - a[1];
      });
      if (sortable.length < j) j = sortable.length;
      const labels = [];
      const metrics = [];
      const bgColors = [];
      for (let i = 0; i < j; i++) {
        if (!sortable[i]) break;
        bgColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        labels.push(sortable[i][0]);
        metrics.push(sortable[i][1]);
      }  
      const AQD = new OptionsInit();
      AQD.options.plugins.title.text = `Top ${j} Queries by Average Duration`;
      const AQDData = new GraphDataInit();
      AQDData.data.labels = labels;
      AQDData.data.datasets[0].data = metrics;
      AQDData.data.datasets[0].backgroundColor = bgColors;
      // console.log('AQDDATA', AQDData.data)
      cards.push(<Bar data={AQDData.data} options={AQD.options}/>);
      break;     
  };

  switch (context.TOF.render) {
    case true:
      let j = context.TOF.list;
      const sortable = [];
      for (const query in count) {
        // as this is an operations insight,
        // we want to filter out all items that
        // are root queries. Leaving only resolvers
          if (!rawdata[query]) sortable.push([query, count[query]]);
      }
      sortable.sort(function(a, b) {
          return b[1] - a[1];
      });
      const labels = [];
      const metrics = [];
      const bgColors = [];
      if (sortable.length < j) j = sortable.length;
      for (let i = 0; i < j; i++) {
        if (!sortable[i]) break;
        bgColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        labels.push(sortable[i][0]);
        metrics.push(sortable[i][1]);
      }
      const TOF = new OptionsInit();
      TOF.options.plugins.title.text = `Top ${j} Operations by Frequency`;
      const TOFData = new GraphDataInit();
      TOFData.data.labels = labels;
      TOFData.data.datasets[0].data = metrics;
      TOFData.data.datasets[0].backgroundColor = bgColors;
      
      cards.push(<Bar data={TOFData.data} options={TOF.options}/>);
      break;        
  };

  switch (context.AOD.render) {
    case true:
      if (cards.length >= 3) break;
      let j = context.AOD.list;
      const sortable = [];
      for (const query in averages) {
          if (!rawdata[query]) sortable.push([query, averages[query]]);
      }
      sortable.sort(function(a, b) {
          return b[1] - a[1];
      });
      const labels = [];
      const metrics = [];
      const bgColors = [];
      if (sortable.length < j) j = sortable.length;
      for (let i = 0; i < j; i++) {
        if (!sortable[i]) break;
        bgColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        labels.push(sortable[i][0]);
        metrics.push(sortable[i][1]);
      }  
      const AOD = new OptionsInit();
      AOD.options.plugins.title.text = `Top ${j} Operations by Average Duration`;
      const AODData = new GraphDataInit();
      AODData.data.labels = labels;
      AODData.data.datasets[0].data = metrics;
      AODData.data.datasets[0].backgroundColor = bgColors;
      cards.push(<Bar data={AODData.data} options={AOD.options}/>);
      break;       
  };
  return cards;
}

const grid = (graphs) => {
  // take in the compiled graphs and
  // return one grid component per graph
  // (up to 3)
  const coordProps = [[1, 2], [2, 1], [2, 2]];
  return graphs.map((graph, index) => {
    return(
    <GridItem key={index} rowStart={coordProps[index][0]} colStart={coordProps[index][1]}>
      {graph}
    </GridItem>
    );
  });
};

const insights = () => {

  const dummyContext = {
    TQF: {
      render: true,
      list: 4
    },
    AQD: {
      render: true,
      list: 4
    },
    TOF: {
      render: true,
      list: 2
    },
    AOD: {
      render: true,
      list: 4
    },
  };

  const { rawdata, averages, count } = useSelector((state) => state.data);
  const graphArray = graphs(dummyContext, rawdata, averages, count);
  const gridComponents = grid(graphArray);
  // console.log(gridComponents[1].props.children.props.data.datasets[0]);
  gridComponents.forEach((grid) => {
    console.log(grid.props.children.props.data.datasets[0])
  })
  return(
    <Grid templateColumns='repeat(2, 1fr)' templateRows='repeat(2, 1fr)' h='100%' w='100%' gap={4}>
      {gridComponents}
    </Grid>
  )
}

export default insights;