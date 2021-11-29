import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: {
    sm: "0",
    md: "700px",
    lg: "960px",
    xl: "1200px",
  },
});

export default theme;