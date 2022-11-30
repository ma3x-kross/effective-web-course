import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardProps } from 'types/CardProps';

import CHARACTERS from 'mocks/charactersData';
import {
  Box,
  Container,
  Divider,
  Heading,
  Image,
  Link,
  Text
} from '@chakra-ui/react';

const CharacterInfo: FC = () => {
  const [characterInfo, setPersonInfo] = useState<CardProps | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id, 10);
      const result = CHARACTERS.find((character) => character.id === numberId);
      if (result) {
        setPersonInfo(result);
        console.log(characterInfo);
      }
    }
  }, [characterInfo]);

  return (
    <>
      {characterInfo && (
        <Container display="flex" maxW="container.xl" p={6}>
          <Image
            src={characterInfo?.img}
            w="395px"
            h="600px"
            mr={10}
            borderRadius="xl"
          />
          <Box display="flex" flexDirection="column" gap="4">
            <Heading>{characterInfo.name}</Heading>
            <Text mb={3}>{characterInfo.description}</Text>
            <Divider />
            <Heading size="md">Related comics</Heading>
            {characterInfo.ref?.comics?.map((comics) => (
              <Link href={`/comics/${comics.id}`}>{comics.name}</Link>
            ))}
            <Divider />
            <Heading size="md">Related series</Heading>
            {characterInfo.ref?.series?.map((series) => (
              <Link href={`/series/${series.id}`}>{series.name}</Link>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};

export default CharacterInfo;
