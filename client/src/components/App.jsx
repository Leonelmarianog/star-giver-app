import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/auth/AuthContext';
import { NotificationProvider } from '../contexts/notification/NotificationContext';
import Routes from './router/Routes';
import customTheme from '../chakra/theme';

const App = () => (
  <ChakraProvider theme={customTheme}>
    <NotificationProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NotificationProvider>
  </ChakraProvider>
);

export default App;
