import FlexComponent from './flexComponent'
import { GridItem, Heading } from '@chakra-ui/react';

const makeGraphs = (averages: {[key: string]: number}, count: {[key: string]: any}) => {
  // push completed divs into this array
  const graphDivs: any[] = [];

  // declare arrays for data to be split between
  const rootAvg: [string, number][] = []
  const rootCt: [string, number][] = [];
  const resolveAvg: [string, number][] = [];
  const resolveCt: [string, number][] = [];

  // Divide the queries into root operations and resolvers
  // while preserving the count - average distinction
  for (const query in averages) {
    if (query.slice(0, 5) == ("RootQ" || "Mutat" || "Query")) {
      rootAvg.push([query, averages[query]]);
      rootCt.push([query, count[query]]);
    } else {
      resolveAvg.push([query, averages[query]]);
      resolveCt.push([query, count[query]]);
    }
  }

  // sort the number metrics by descending and keep only their top 5 entries
  const mapGraphs = (arr: any[]) => {
    return arr.map((graphArr) => {
      return graphArr.sort((a: any[], b: any[]) => b[1] - a[1]).splice(5);
    })
  }

  // rootAvg.sort((a, b) => b[1] - a[1]).splice(5);
  // rootCt.sort((a, b) => b[1] - a[1]).splice(5);
  // resolveAvg.sort((a, b) => b[1] - a[1]).splice(5);
  // resolveCt.sort((a, b) => b[1] - a[1]).splice(5);

  // cast graph data and coordinates to arrays
  const graphData = mapGraphs([rootAvg, rootCt, resolveAvg, resolveCt]);
  const gridCoords = [[1, 1], [2, 1], [1, 2], [2, 2]];
  const headings = [
    'Top 5 Root Operations by Average Duration',
    'Top 5 Root Operations by Invocation Count', 
    'Top 5 Resolvers by Average Duration', 
    'Top 5 Resolvers by Invocation Count'
    ];
  // for each item of graph data
  while (graphData.length) {
    // shift the first element of both arrays
    // to be used as this graph's props
    
    let label: string = ''
    const thisGraph: any[] = graphData.shift();
    const theseCoords: any = gridCoords.shift();
    const thisLabel: string | undefined = headings.shift();
    if (theseCoords && theseCoords[0] === 1) label = 'ms';
    // map the iterative props to a FlexComponent component
    // cast to an array
    const theseComponents = thisGraph.map((item: any[], index: number) => <FlexComponent key={index.toString()} max={thisGraph[0][1]} thisNum={item[1]} name={item[0]} label={label} />);
      // render that array into a GridItem div 
      // and push it to the output array
      graphDivs.push(
        <GridItem 
          rowStart={theseCoords[0]} 
          colStart={theseCoords[1]}
          backgroundColor='blue.700'
          p={'1.5rem'}
          display='flex'
          flexDirection='column'
          h={'1fr'}
          borderRadius='1rem'
        >
          <Heading
            size='sm'
            mb='1rem'
          >
            {thisLabel}
          </Heading>
          <hr/>
          {theseComponents}
        </GridItem>
      )
  }
  // after the while loop has run four times;
  // once for each insight graph,
  // return the four graph components
  // to their final container outside of this file
  return graphDivs
};

export default makeGraphs
