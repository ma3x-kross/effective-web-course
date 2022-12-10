import { Center, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import MyCard from 'components/MyCard';
import Search from 'components/Search';
import { ISeries } from 'types/series';
import seriesStore from 'store/Series'
import { observer } from 'mobx-react-lite';
import Pagination from 'components/Pagination';
import { SERIES } from 'constants/api';

const Series: FC = () => {
  const {series, isLoading, currentPage, searchValue} = seriesStore

  useEffect(()=>{
    if (searchValue) {
      seriesStore.getSeriesByName(searchValue, currentPage - 1);
    } else {
      seriesStore.getAllSeries(currentPage - 1);
    }

  }, [currentPage])

    return (
      <Container maxW="container.xl" p={6}>
        <Search placeholder="Search for Series by name" pageName="series" />
        {isLoading === true ? (
          <Center>
            <Spinner size="xl" thickness="4px"></Spinner>
          </Center>
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {series.results.map(
              ({
                id,
                title,
                description,
                thumbnail: { extension, path }
              }: ISeries) => (
                <MyCard
                  key={id}
                  id={id}
                  name={title}
                  description={description}
                  img={`${path}.${extension}`}
                  path="/series/"
                ></MyCard>
              )
            )}
          </SimpleGrid>
        )}
        <Center>
          <Pagination
            totalCards={series.total}
            currentPage={currentPage}
            pageName={SERIES}
          />
        </Center>
      </Container>
    );
};

export default observer(Series);
