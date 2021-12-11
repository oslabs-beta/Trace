import makeGraphs from './graphGenerator'
import { Grid } from '@chakra-ui/react'
import { useAppSelector } from '../state/hooks'
// display grid
// this file will essentially be the insights component

const graphContainer = () => {

<<<<<<< HEAD
  const { rawdata, averages, count} = useAppSelector((state) => state.data)
  
  const graphs = makeGraphs(rawdata, averages, count);
=======
  const { rawdata, averages, count } = useAppSelector((state) => state.data)

  const graphs = makeGraphs(averages, count);
>>>>>>> 670f1067b92ee23014dc957b3ad05c8e237cbf3f
  return (
    <Grid
      gap={4}
      templateColumns='repeat(2, 1fr)'
    >
      {graphs}
    </Grid>
  )
}

export default graphContainer