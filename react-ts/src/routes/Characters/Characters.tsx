import { Container, Grid, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import MyCard from '../../components/MyCard';
import CHARACTERS from '../../mocks/charactersData';

const Characters: FC = () => {
  {
    return (
      <Container maxW="container.xl" p={6}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {CHARACTERS.map((character) => (
            <MyCard
              key={character.id}
              id={character.id}
              name={character.name}
              description={character.description}
              img={character.img}
            ></MyCard>
          ))}
        </SimpleGrid>
      </Container>
    );
  }
};

export default Characters;
