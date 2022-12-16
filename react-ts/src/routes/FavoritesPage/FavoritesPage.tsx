import { Center, Container, SimpleGrid, Text } from '@chakra-ui/layout';
import MyCard from 'components/MyCard';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FavoritesStore from 'store/Favorites';
import { CardProps } from 'types/CardProps';

const Favorites = () => {
  const { favorites } = FavoritesStore;
  const { t } = useTranslation();

  return (
    <Container maxW="container.xl" p={6}>
      {favorites.length ? (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
          {favorites.map(({ id, name, description, img, path }: CardProps) => (
            <MyCard
              key={id}
              id={id}
              name={name}
              description={description}
              img={img}
              path={path}
            ></MyCard>
          ))}
        </SimpleGrid>
      ) : (
        <Center>
          <Text fontWeight={900} fontSize="3xl">
            {t('emptyFavorites')}
          </Text>
        </Center>
      )}
    </Container>
  );
};

export default observer(Favorites);
