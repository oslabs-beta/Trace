import FlexKiddo from './flexComponent'
import { GridItem } from '@chakra-ui/react';

const makeGraphs = (rawdata: any, averages: any, count: any) => {
  // push completed divs into this array
  const graphDivs = [];

  // declare arrays for data to be split between
  const rootAvg: any[] = []
  const rootCt: any[] = [];
  const resolveAvg:any[] = [];
  const resolveCt: any[] = [];

  // Divide the queries into root operations and resolvers
  // while preserving the count - average distinction
  for (const query in averages) {
    if (query.slice(0, 5) === ("Query" || "Mutat")) {
      rootAvg.push([query, averages[query]]);
      rootCt.push([query, count[query]]);
    } else {
      resolveAvg.push([query, averages[query]]);
      resolveCt.push([query, count[query]]);
    }
  }

  // sort the averages and keep only their top 5 entries
  rootAvg.sort((a, b) => a[1] - b[1]).splice(5);
  rootCt.sort((a, b) => a[1] - b[1]).splice(5);
  resolveAvg.sort((a, b) => a[1] - b[1]).splice(5);
  resolveCt.sort((a, b) => a[1] - b[1]).splice(5);

  // cast graph data and coordinates to arrays
  const graphData = [rootAvg, rootCt, resolveAvg, resolveCt];
  const coordProps = [[1, 1], [2, 1], [1, 2], [2, 2]];

  // for each item of graph data
  while (graphData.length) {
    // shift the first element of both arrays
    // to be used as this graph's props

    
    const thisGraph: any = graphData.shift();
    const theseCoords: any = coordProps.shift();

    // map the iterative props to a FlexKiddo component
    // cast to an array
    const theseComponents = thisGraph.map((item: any) => <FlexKiddo max={thisGraph[0][1]} thisNum={item[1]} name={item[0]} />);
      // render that array into a GridItem div 
      // and push it to the output array
      graphDivs.push(
        <GridItem rowStart={theseCoords[0]} colStart={theseCoords[1]}>
          <h1>Heading</h1>
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
