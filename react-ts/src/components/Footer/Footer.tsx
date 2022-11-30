import {
  Box,
  Container,
  Image,
  Flex,
  HStack,
  Text,
  Link,
  useColorMode
} from '@chakra-ui/react';

import Logo from 'assets/marvel_logo.svg';

const Footer = () => {
  const CURRENT_YEAR = new Date().getFullYear();
  const { colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      mt="20px"
      py={2}
      bg={colorMode === 'dark' ? 'gray.900' : 'gray.400'}
    >
      <Container maxW="container.xl" p={0}>
        <Flex flexDirection="column" alignItems="center">
          <Image src={Logo} alt="marvel" boxSize="100px" ml={5} />
          <Text fontSize="lg" color="white">
            Data provided by Marvel. © {CURRENT_YEAR} MARVEL
          </Text>
          <Link fontSize="lg" color="white" href="developer.marvel.com">
            developer.marvel.com
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
