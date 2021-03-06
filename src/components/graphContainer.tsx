import makeGraphs from './graphGenerator'
import { Grid } from '@chakra-ui/react'
import { useAppSelector } from '../state/hooks'

const GraphContainer = () => {

  const { averages, count } = useAppSelector((state) => state.data)
  const graphs = makeGraphs(averages, count);

  return (
    <Grid
      gap={4}
      templateColumns='repeat(2, 1fr)'
    >
      {graphs}
    </Grid>
  )
}

export default GraphContainer