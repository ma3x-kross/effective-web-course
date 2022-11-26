import { ChakraProvider, theme } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Characters from './routes/Characters';
import Comics from './routes/Comics';

const App: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Characters />
        },
        {
          path: '/comics',
          element: <Comics />
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
