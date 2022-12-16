import {
  Box,
  Container,
  Image,
  Flex,
  useColorMode,
  HStack,
  Button
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Logo from 'assets/marvel_logo.svg';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Favorite from 'components/Favorite';
import { useState } from 'react';

const Header = () => {
  const [langs, SetLangs] = useState('en');
  const { t, i18n } = useTranslation();

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
                key={page.toString()}
                color="white"
                fontWeight="bold"
                letterSpacing="wide"
                fontSize="xl"
                textTransform="uppercase"
              >
                <NavLink
                  to={'/' + page}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {t(page)}
                </NavLink>
              </Box>
            ))}

            <Favorite />
            <Button
              size="md"
              fontSize="md"
              onClick={() => {
                if (langs === 'en') {
                  i18n.changeLanguage('рус');
                  SetLangs('рус');
                } else {
                  i18n.changeLanguage('en');
                  SetLangs('en');
                }
              }}
            >
              {langs==='en'?('рус'):('en')}
            </Button>
            <ColorModeSwitcher mr={5} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
