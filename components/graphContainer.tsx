import makeGraphs from './graphGenerator'
import { Grid } from '@chakra-ui/react'
import { useAppSelector } from '../state/hooks'
// display grid
// this file will essentially be the insights component

const insights = () => {

  const { rawdata, averages, count} = useAppSelector((state) => state.data)
  
  const graphs = makeGraphs(rawdata, averages, count);
  return (
    <Grid>
      {graphs}
    </Grid>
  )
}

