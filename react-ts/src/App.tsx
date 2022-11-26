import { ChakraProvider, theme } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Characters from './routes/Characters';

const App: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Characters />
        }
      ]
    }
  ];

  const element = useRoutes(routes);
  return (
    <ChakraProvider theme={theme}>
      <Header />
      {element}
    </ChakraProvider>
  );
};

export default App;
