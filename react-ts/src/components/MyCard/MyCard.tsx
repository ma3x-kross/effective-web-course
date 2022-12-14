import { Card, CardBody, Image, Stack, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProps } from 'types/CardProps';

const MyCard: FC<CardProps> = ({ id, name, description, img, path }) => {
  {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`${path}${id}`);
    };
    return (
      <Card maxW="sm" _hover={{ shadow: 'outline', cursor: 'pointer' }}>
        <CardBody
          title={description ? description : 'No description'}
          onClick={handleClick}
        >
          <Image
            width="250px"
            height="440px"
            src={img}
            alt={name}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
          </Stack>
        </CardBody>
      </Card>
    );
  }
};

export default MyCard;
