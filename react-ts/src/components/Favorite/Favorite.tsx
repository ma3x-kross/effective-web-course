import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import icon from './img/bookmark.svg';
import FavoritesStore from 'store/Favorites';
import { observer } from 'mobx-react-lite';

const Favorite = () => {
  return (
    <Box w="50px" position="relative" top="0" left="0">
      <Link to="/favorites">
        <Box
          position="absolute"
          top="0px"
          right="2px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="25px"
          h="25px"
          fontSize="13px"
          fontWeight="bold"
          color="black"
          background="white"
          borderRadius="50%"
          shadow="dark-lg"
        >
          {FavoritesStore.favorites.length > 99
            ? '···'
            : FavoritesStore.favorites.length}
        </Box>
        <Image src={icon} alt="Favorites" />
      </Link>
    </Box>
  );
};

export default observer(Favorite);
