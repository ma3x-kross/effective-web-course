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
  Spinner,
  Text
} from '@chakra-ui/react';
import seriesStore from 'store/Series';
import { observer } from 'mobx-react-lite';
import { BASE_URL, CHARACTERS, COMICS, HTTP } from 'constants/api';

const SeriesInfo: FC = () => {
  const { oneSeries, isLoading } = seriesStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id, 10);
      seriesStore.getOneSeries(numberId);
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
            src={`${oneSeries.thumbnail.path}.${oneSeries.thumbnail.extension}`}
            w="395px"
            h="600px"
            mr={10}
            borderRadius="xl"
          />
          <Box display="flex" flexDirection="column" gap="4">
            <Heading>{oneSeries.title}</Heading>
            <Text mb={3}>{oneSeries.description}</Text>
            <Divider />
            <Heading size="md">Related characters</Heading>
            {oneSeries.characters?.items?.map((character) => (
              <Link
                key={character.name}
                href={`/${character.resourceURI.replace(
                  `${HTTP + BASE_URL + CHARACTERS}/`,
                  ''
                )}`}
              >
                {character.name}
              </Link>
            ))}
            <Divider />
            <Heading size="md">Related comics</Heading>
            {oneSeries.comics?.items?.map((item) => (
              <Link
                key={item.resourceURI}
                href={`/${COMICS}/${item.resourceURI.replace(
                  `${HTTP + BASE_URL + COMICS}/`,
                  ''
                )}`}
              >
                {item.name}
              </Link>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};

export default observer(SeriesInfo);
