import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { CardProps } from '../../types/CardProps';

const MyCard: FC<CardProps> = ({ name, description, img }) => {
  {
    return (
      <Card maxW="sm" _hover={{shadow: 'outline', cursor: 'pointer'}}>
        <CardBody>
          <Image width='250px' height='380px' src={img} alt={name} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
          </Stack>
        </CardBody>
      </Card>
    );
  }
};

export default MyCard;
