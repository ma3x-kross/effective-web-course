import { Container, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import MyCard from '../../components/MyCard';
import Search from '../../components/Search';
import CHARACTERS from '../../mocks/charactersData';

const Characters: FC = () => {
  {
    return (
      <Container maxW="container.xl" p={6}>
        <Search placeholder='Search for Characters by name' />
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {CHARACTERS.map((character) => (
            <MyCard
              key={character.id}
              id={character.id}
              name={character.name}
              description={character.description}
              img={character.img}
              path='/'
            ></MyCard>
          ))}
        </SimpleGrid>
      </Container>
    );
  }
};

export default Characters;
