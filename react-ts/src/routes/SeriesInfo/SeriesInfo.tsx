import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardProps } from 'types/CardProps';

import SERIES from 'mocks/seriesData';
import {
  Box,
  Container,
  Divider,
  Heading,
  Image,
  Link,
  Text
} from '@chakra-ui/react';

const SeriesInfo: FC = () => {
  const [seriesInfo, setPersonInfo] = useState<CardProps | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id, 10);
      const result = SERIES.find((series) => series.id === numberId);
      if (result) {
        setPersonInfo(result);
        console.log(seriesInfo);
      }
    }
  }, [seriesInfo]);

  return (
    <>
      {seriesInfo && (
        <Container display="flex" maxW="container.xl" p={6}>
          <Image
            src={seriesInfo?.img}
            w="395px"
            h="600px"
            mr={10}
            borderRadius="xl"
          />
          <Box display="flex" flexDirection="column" gap="4">
            <Heading>{seriesInfo.name}</Heading>
            <Text mb={3}>{seriesInfo.description}</Text>
            <Divider />
            <Heading size="md">Related comics</Heading>
            {seriesInfo.ref?.comics?.map((comics) => (
              <Link href={`/comics/${comics.id}`}>{comics.name}</Link>
            ))}
            <Divider />
            <Heading size="md">Related characters</Heading>
            {seriesInfo.ref?.characters?.map((characters) => (
              <Link href={`/${characters.id}`}>{characters.name}</Link>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};

export default SeriesInfo;
