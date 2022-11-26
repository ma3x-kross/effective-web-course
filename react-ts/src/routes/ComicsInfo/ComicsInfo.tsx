import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardProps } from '../../types/CardProps';

import COMICS from '../../mocks/comicsData';

import {
  Box,
  Container,
  Divider,
  Heading,
  Image,
  Link,
  Text
} from '@chakra-ui/react';


const ComicsInfo: FC = () => {
  const [comicsInfo, setPersonInfo] = useState<CardProps | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id, 10);
      const result = COMICS.find((comics) => comics.id === numberId);
      if (result) {
        setPersonInfo(result);
        console.log(comicsInfo);
      }
    }
  }, [comicsInfo]);

  return (
    <>
      {comicsInfo && (
        <Container display="flex" maxW="container.xl" p={6}>
          <Image
            src={comicsInfo?.img}
            w="395px"
            h="600px"
            mr={10}
            borderRadius="xl"
          />
          <Box display="flex" flexDirection="column" gap="4">
            <Heading>{comicsInfo.name}</Heading>
            <Text mb={3}>{comicsInfo.description}</Text>
            <Divider />
            <Heading size="md">Related characters</Heading>
            {comicsInfo.ref?.characters?.map((character) => (
              <Link href={`/${character.id}`}>{character.name}</Link>
            ))}
            <Divider />
            <Heading size="md">Related series</Heading>
            {comicsInfo.ref?.series?.map((series) => (
              <Link href={`/series/${series.id}`}>{series.name}</Link>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};

export default ComicsInfo;
