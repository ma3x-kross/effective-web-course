import { Card, CardBody, Image, Stack, Heading, Icon } from '@chakra-ui/react';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProps } from 'types/CardProps';
import FavoritesStore from 'store/Favorites';
import { StarIcon } from '@chakra-ui/icons';
import { observer } from 'mobx-react-lite';
import { transform } from 'framer-motion';

const MyCard: FC<CardProps> = ({ id, name, description, img, path }) => {
  {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`${path}${id}`);
    };

    const [isHovering, setIsHovering] = useState<boolean>(false);

    const handleMouseOver: MouseEventHandler = () => {
      setIsHovering(true);
    };

    const handleMouseOut: MouseEventHandler = () => {
      setIsHovering(false);
    };

    const handleFavoritesClick: MouseEventHandler = (event) => {
      if (!FavoritesStore.isFavorite(id)) {
        FavoritesStore.addToFavorites({ id, name, description, img, path });
      } else {
        FavoritesStore.removeFromFavorites(id);
      }
      event.stopPropagation();
    };

    return (
      <Card maxW="sm" _hover={{ shadow: 'outline', cursor: 'pointer' }}>
        <CardBody
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          title={description ? description : 'No description'}
          onClick={handleClick}
        >
          {isHovering && (
            <Icon
              boxSize={8}
              onClick={handleFavoritesClick}
              as={StarIcon}
              stroke="#000"
              strokeWidth={0.5}
              color={FavoritesStore.isFavorite(id) ? '#ffc107' : 'white'}
              position="absolute"
              top="30px"
              right="30px"
            ></Icon>
          )}

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

export default observer(MyCard);
