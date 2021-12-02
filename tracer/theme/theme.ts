import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  breakpoints: {
    sm: "0",
    md: "700px",
    lg: "960px",
    xl: "1200px",
  },
  global: (props) => ({
    body: {
       color: mode('gray.800', 'whiteAlpha.900')(props),
       bg: mode('gray.100', '#141214')(props),
    }
 }),
}
const theme = extendTheme({ config });

export default theme;