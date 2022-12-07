import { Center, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import MyCard from 'components/MyCard';
import Search from 'components/Search';
import { IComics } from 'types/comics';
import comicsStore from 'store/Comics';
import { observer } from 'mobx-react-lite';

const Comics: FC = () => {
  const { comics, isLoading } = comicsStore;
  
  useEffect(() => {
      comicsStore.getAllComics(0); //offset
    }, []);

    return (
      <Container maxW="container.xl" p={6}>
        <Search placeholder="Search for Comics by name" />
        {isLoading === true ? (
          <Center>
            <Spinner size="xl" thickness="4px"></Spinner>
          </Center> 
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {comics.map(
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
      </Container>
    );
};

export default observer(Comics);
