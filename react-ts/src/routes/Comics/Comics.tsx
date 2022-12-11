import { Center, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import MyCard from 'components/MyCard';
import Search from 'components/Search';
import { IComics } from 'types/comics';
import comicsStore from 'store/Comics';
import { observer } from 'mobx-react-lite';
import Pagination from 'components/Pagination';
import { COMICS } from 'constants/api';

const Comics: FC = () => {
  const { comics, isLoading, currentPage, searchValue } = comicsStore;
  
  useEffect(() => {
    if (searchValue) {
      comicsStore.getComicsByName(searchValue, currentPage - 1);
    } else {
      comicsStore.getAllComics(currentPage - 1);
    }
      comicsStore.getAllComics(0);
    }, [currentPage]);

    return (
      <Container maxW="container.xl" p={6}>
        <Search placeholder="Search for Comics by name" pageName="comics" />
        {isLoading === true ? (
          <Center>
            <Spinner size="xl" thickness="4px"></Spinner>
          </Center>
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {comics.results.map(
              ({
                id,
                title,
                description,
                thumbnail: { extension, path }
              }: IComics) => (
                <MyCard
                  key={id}
                  id={id}
                  name={title}
                  description={description}
                  img={`${path}.${extension}`}
                  path="/comics/"
                ></MyCard>
              )
            )}
          </SimpleGrid>
        )}
        <Center>
          <Pagination
            totalCards={comics.total}
            currentPage={currentPage}
            pageName={COMICS}
          />
        </Center>
      </Container>
    );
};

export default observer(Comics);
