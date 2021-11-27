import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Drawer: {
      baseStyle: {
        boxShadow: 'none'
      },
      variants: {
        peek: {
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});

export default theme;