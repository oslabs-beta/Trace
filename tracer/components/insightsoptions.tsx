import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


const insightsoptions = () => {

  const { rawdata, averages, count } = useSelector((state) => state.data);

  const options = ['TQF', 'AQD', 'TOF', 'AOD', 'TFA', 'ADA'];
  const 
}
/* 
    Insights:
    Top Query by Frequency: TQF
    Average Query Duration: AQD
    Top Operations by Frequency: TOF
    Average Operation Duration: AOD
    Top Frequency of All: TFA
    Average Duration of All: ADA
*/

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
