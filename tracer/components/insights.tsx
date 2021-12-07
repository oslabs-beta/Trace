import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


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



const insights = () => {

  const containers = [
    <GridItem colStart={2} rowSpan={3}  bg='tomato'></GridItem>,
    <GridItem rowStart={4} rowSpan={3}  bg='tomato'></GridItem>,
    <GridItem rowStart={4} rowSpan={3}  bg='tomato'></GridItem>
  ]

  const cardGenerator = (context: any, containers: []) => {
    const { rawdata, averages, count } = useSelector((state) => state.data);

    const cards = [];
    let components = 0  

    switch (context.TQF.render) {
      case true:
        let j = context.TQF.list;
        
        const sortable = [];
        for (const query in count) {
            sortable.push([query, count[query]]);
        }
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        for (let i = 0; i < j; i++) {
          // look through the count object and log the 'j' highest value entries
          const query = sortable[i][0];
          const freq = sortable[i][1];
          
        }

        // turn tqf into a graph and return that graph in
        // containers[components];

        components++
        //useSelector and create     
    }

    switch (context.AQD.render) {
      case true:
        components++
        //useSelector and create       
    }

    switch (context.TOF.render) {
      case true:
        components++
        //useSelector and create        
    }

    switch (context.AOD.render) {
      case true:
        if (components >= 3) return
        components++
        //useSelector and create
    }

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
  }









  return(
    <Grid templateColumns='repeat(2, 1fr)' templateRows='repeat(2, 1fr)' h='100%' w='100%' gap={6}>
      <GridItem colStart={2} rowSpan={1} bg='tomato'></GridItem>
      <GridItem rowStart={2} rowSpan={1}  bg='tomato'></GridItem>
      <GridItem rowStart={2} rowSpan={1}  bg='tomato'></GridItem>
    </Grid>
  )
}

export default insights;