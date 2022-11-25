import {
  Box,
  Container,
  Image,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Logo from '../../assets/marvel_logo.svg';
import { NavLink } from 'react-router-dom';
const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="header"
      py={2}
      bg={colorMode === 'dark' ? 'purple.800' : 'red.600'}
    >
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Image src={Logo} alt="marvel" boxSize="50px" />
          <ColorModeSwitcher />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
