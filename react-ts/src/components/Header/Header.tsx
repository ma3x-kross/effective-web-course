import {
  Box,
  Container,
  Image,
  Flex,
  useColorMode,
  HStack
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Logo from '../../assets/marvel_logo.svg';
import { NavLink } from 'react-router-dom';
const Header = () => {
  const { colorMode } = useColorMode();

  const pages = ['characters', 'comics', 'series'];

  let activeStyle = {
    textShadow: '0 0 5px #fff, 0 0 50px #6a83fb'
  };
  return (
    <Box
      as="header"
      py={2}
      bg={colorMode === 'dark' ? 'purple.800' : 'red.600'}
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <NavLink to="/">
            <Image src={Logo} alt="marvel" boxSize="50px" ml={5} />
          </NavLink>
          <HStack spacing="30px">
            {pages.map((page, key) => (
              <Box
                color="white"
                fontWeight="bold"
                letterSpacing="wide"
                fontSize="xl"
                textTransform="uppercase"
                sx={{}}
              >
                <NavLink
                  to={'/' + (page === 'characters' ? '' : page)}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {page}
                </NavLink>
              </Box>
            ))}
          </HStack>
          <ColorModeSwitcher mr={5} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
