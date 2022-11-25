import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from './components/Header';

import routesConfig from './routes/routesConfig';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
    </ChakraProvider>
  );
}

export default App;
