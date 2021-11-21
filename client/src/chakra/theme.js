import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'purple.800' : 'purple.300',
      minWidth: '300px',
      minHeight: '100vh',
    },
  }),
};

const customTheme = extendTheme({
  styles,
  config,
});

export default customTheme;
