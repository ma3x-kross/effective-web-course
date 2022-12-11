import { ChakraProvider, theme } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import CharacterInfo from 'routes/CharacterInfo';
import Characters from 'routes/Characters';
import Comics from 'routes/Comics';
import ComicsInfo from 'routes/ComicsInfo';
import Series from 'routes/Series';
import SeriesInfo from 'routes/SeriesInfo';
import NotFound from 'routes/NotFound';

const App: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to='characters' />
        },
        {
          path: '/characters',
           element: <Characters />
        },
        {
          path: 'characters/:id',
          element: <CharacterInfo />
        },
        {
          path: '/comics',
          element: <Comics />
        },
        {
          path: '/comics/:id',
          element: <ComicsInfo />
        },
        {
          path: '/series',
          element: <Series />
        },
        {
          path: '/series/:id',
          element: <SeriesInfo />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ];

  const element = useRoutes(routes);
  return (
    <ChakraProvider theme={theme}>
      <Header />
      {element}
      <Footer />
    </ChakraProvider>
  );
};

export default App;
