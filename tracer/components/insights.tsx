import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// using chart.js/auto to get started quickly
// should refactor to import only what is being used
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


/*
  
  I WANT TO:
  Create a component that renders up to three divs. 

  The main component will be a CSS Grid container
  layed out with two columns and 5 or 7 rows.

  The insights boxes will each span two rows
  (with the leftover row being reserved to make
  space for the header and options div.)
  
  Then, we will read the context object from options to decide what we're rendering.

  * We can render up to 3 boxes at a time *

  At the top of the Box we will display the name of the insight along
  with how many queries are displayed.
  e.g. `Top ${num} Resolver durations` or `Top ${num} Operations by frequency`

  The rest of the Box will simply display the metrics and a graph,
  with an overflow scroll bar for longer insights.

*/

/*
context = {
  TQF: {
    render: Boolean,
    list: integer(default 5);
  },
  AQD: {
    render: Boolean,
    list: integer(default 5);
  },
  ...others
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
  }
};

const graphs = (context) => {
  // take in the context object
  // and create the graphs
  const { rawdata, averages, count } = useSelector((state) => state.data);

    const cards = [];
    
    switch (context.TQF.render) {
      case true:
        // init the list to a variable
        let j = context.TQF.list;
        // init an array to be sorted
        const sortable = [];
        // add objects into that array
        for (const query in count) {
            sortable.push([query, count[query]]);
        }
        // sort the array in numerical order (descending)
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        // compile labels & metrics for as many entries as the user selected
        const labels = [];
        const metrics = [];
        for (let i = 0; i < j; i++) {
          if (!sortable[i]) break;
          labels.push(sortable[i][0]);
          metrics.push(sortable[i][1]);
        }
      
      const graphData = {
        labels,
        datasets: {
          label: `Top ${j} Queries by Frequency`,
          data: metrics,
          backgroundColor: '#FFFFFF'
        }
      }
        // turn into a graph and return that graph
      cards.push(<Bar data={graphData} options={}/>)        
            
    }

    switch (context.AQD.render) {
      case true:
        let j = context.AQD.list;
        const sortable = [];
        for (const query in averages) {
            sortable.push([query, averages[query]]);
        }
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        const labels = [];
        const metrics = [];
        for (let i = 0; i < j; i++) {
          if (!sortable[i]) break;
          labels.push(sortable[i][0]);
          metrics.push(sortable[i][1]);
        }

        const graphData = {
          labels,
          datasets: {
            label: `Top ${j} Queries by Average Duration`,
            data: metrics,
            backgroundColor: '#FFFFFF'
          }
        }

        cards.push(<Bar data={graphData} options={}/>)        
    }

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
            return a[1] - b[1];
        });
        const labels = [];
        const metrics = [];
        for (let i = 0; i < j; i++) {
          if (!sortable[i]) break;
          labels.push(sortable[i][0]);
          metrics.push(sortable[i][1]);
        }

        const graphData = {
          labels,
          datasets: {
            label: `Top ${j} Operations by Frequency`,
            data: metrics,
            backgroundColor: '#FFFFFF'
          }
        };

        cards.push(<Bar data={graphData} options={}/>);        
    }

    switch (context.AOD.render) {
      case true:
        if (cards.length >= 3) return
        let j = context.AOD.list;
        const sortable = [];
        for (const query in averages) {
            if (!rawdata[query]) sortable.push([query, averages[query]]);
        }
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        const labels = [];
        const metrics = [];
        for (let i = 0; i < j; i++) {
          if (!sortable[i]) break;
          labels.push(sortable[i][0]);
          metrics.push(sortable[i][1]);
        }

        const graphData = {
          labels,
          datasets: {
            label: `Top ${j} Operations by Average Duration`,
            data: metrics,
            backgroundColor: '#FFFFFF'
          }
        };

        cards.push(<Bar data={graphData} options={}/>);          
    }

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
    return cards;
}
// const graphArray = graphs(context);

const grid = (graphs) => {
  // take in the compiled graphs and
  // return one grid component per graph
  // (up to 3)
  const coordProps = [[1, 2], [2, 1], [2, 2]];
  
  // do not return components; map them to an array 
  // inputting the coordProps to each accordingly.
  // return that array to be passed into insights
  return(
    <GridItem rowStart={coordProps[i][0]} colStart={coordProps[i][1]}>

    </GridItem>
  )

}

// const gridComponents = grid(graphArray);

const insights = () => {
// main wrapper for insights page
// will take in an array of the
// (up to) three grid components 
// generated by the grid function
// and finally, render them.
  
  return(
    <Grid templateColumns='repeat(2, 1fr)' templateRows='repeat(2, 1fr)' h='100%' w='100%' gap={4}>
      <GridItem colStart={2} bg='tomato'></GridItem>
      <GridItem rowStart={2} bg='tomato'></GridItem>
      <GridItem rowStart={2} bg='tomato'></GridItem>
    </Grid>
  )
}

export default insights;