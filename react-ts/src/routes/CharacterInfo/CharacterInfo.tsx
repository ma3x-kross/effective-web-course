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
import characterStore from 'store/Character';
import { observer } from 'mobx-react-lite';
import { BASE_URL, COMICS, HTTP, SERIES } from 'constants/api';

const CharacterInfo: FC = () => {
  const { oneCharacter, isLoading } = characterStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id, 10);
      characterStore.getOneCharacter(numberId);
    }
  }, [id]);

  return (
    <>
      {isLoading === true ? (
        <Center m="6">
          <Spinner size="xl" thickness="4px"></Spinner>
        </Center>
      ) : (
        <Container display="flex" maxW="container.xl" p={6}>
          <Image
            src={`${oneCharacter.thumbnail.path}.${oneCharacter.thumbnail.extension}`}
            w="395px"
            h="600px"
            mr={10}
            borderRadius="xl"
          />
          <Box display="flex" flexDirection="column" gap="4">
            <Heading>{oneCharacter.name}</Heading>
            <Text mb={3}>{oneCharacter.description}</Text>
            <Divider />
            <Heading size="md">Related comics</Heading>
            <SimpleGrid columns={2} spacingX="6" spacingY="2">
              {oneCharacter.comics?.items?.map((comics) => (
                <Link
                  key={comics.name}
                  href={`/${COMICS}/${comics.resourceURI.replace(
                    `${HTTP + BASE_URL + COMICS}/`,
                    ''
                  )}`}
                >
                  {comics.name}
                </Link>
              ))}
            </SimpleGrid>

            <Divider />
            <Heading size="md">Related series</Heading>
            <SimpleGrid columns={2} spacingX="6" spacingY="2">
              {oneCharacter.series?.items?.map((series) => (
                <Link
                  key={series.name}
                  href={`/${SERIES}/${series.resourceURI.replace(
                    `${HTTP + BASE_URL + SERIES}/`,
                    ''
                  )}`}
                >
                  {series.name}
                </Link>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      )}
    </>
  );
};

export default observer(CharacterInfo);
