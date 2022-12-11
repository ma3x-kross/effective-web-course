import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  Text
} from '@chakra-ui/react';
import comicsStore from 'store/Comics';
import { observer } from 'mobx-react-lite';
import { BASE_URL, CHARACTERS, HTTP, SERIES } from 'constants/api';
import NotFound from 'routes/NotFound';

const ComicsInfo: FC = () => {
  const { oneComics, isLoading } = comicsStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id, 10);
      comicsStore.getOneComics(numberId);
    }
  }, [id]);

  return (
    <>
      {oneComics.id ? (
        isLoading === true ? (
          <Center m="6">
            <Spinner size="xl" thickness="4px"></Spinner>
          </Center>
        ) : (
          <Container display="flex" maxW="container.xl" p={6}>
            <Image
              src={`${oneComics.thumbnail.path}.${oneComics.thumbnail.extension}`}
              w="395px"
              h="600px"
              mr={10}
              borderRadius="xl"
            />
            <Box display="flex" flexDirection="column" gap="4">
              <Heading>{oneComics.title}</Heading>
              <Text mb={3}>{oneComics.description}</Text>
              <Divider />
              <Heading size="md">Related characters</Heading>
              <SimpleGrid columns={2} spacingX="6" spacingY="2">
                {oneComics.characters?.items?.map((character) => (
                  <Link
                    key={character.name}
                    href={`/${CHARACTERS}/${character.resourceURI.replace(
                      `${HTTP + BASE_URL + CHARACTERS}/`,
                      ''
                    )}`}
                  >
                    {character.name}
                  </Link>
                ))}
              </SimpleGrid>
              <Divider />
              <Heading size="md">Related series</Heading>
              <SimpleGrid columns={2} spacingX="6" spacingY="2">
                {
                  <Link
                    key={oneComics.series.name}
                    href={`/${SERIES}/${oneComics.series.resourceURI.replace(
                      `${HTTP + BASE_URL + SERIES}/`,
                      ''
                    )}`}
                  >
                    {oneComics.series.name}
                  </Link>
                }
              </SimpleGrid>
            </Box>
          </Container>
        )
      ) : isLoading === true ? (
        <Center m="6">
          <Spinner size="xl" thickness="4px"></Spinner>
        </Center>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default observer(ComicsInfo);
