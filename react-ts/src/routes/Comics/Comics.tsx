import { Container, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import MyCard from '../../components/MyCard';
import Search from '../../components/Search';
import COMICS from '../../mocks/comicsData';

const Comics: FC = () => {
  {
    return (
      <Container maxW="container.xl" p={6}>
        <Search placeholder="Search for Comics by name" />
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {COMICS.map((el) => (
            <MyCard
              key={el.id}
              id={el.id}
              name={el.name}
              description={el.description}
              img={el.img}
              path='/comics/'
            ></MyCard>
          ))}
        </SimpleGrid>
      </Container>
    );
  }
};

export default Comics;
