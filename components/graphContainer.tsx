import makeGraphs from './graphGenerator'
import { Grid } from '@chakra-ui/react'
import { useAppSelector } from '../state/hooks'
// display grid

const graphContainer = () => {

  const { rawdata, averages, count} = useAppSelector((state) => state.data)

  const graphs = makeGraphs(rawdata, averages, count);
  return (
    <Grid>
      {graphs}
    </Grid>
  )
}

export default graphContainer