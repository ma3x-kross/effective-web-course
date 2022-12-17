import { Center, Heading, Image, Text } from '@chakra-ui/react';
import img from 'assets/thanos.jpg';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const {t} = useTranslation()
  return (
    <Center display="flex" flexDirection="column" m="6">
      <Heading fontWeight={900} size="4xl">
        404
      </Heading>
      <Image
        borderRadius="15px"
        boxShadow="dark-lg"
        w="800px"
        src={img}
        m="6"
      ></Image>
      <Text fontWeight={900} fontSize="3xl">
        {t('notFound')}
      </Text>
    </Center>
  );
};

export default NotFound;
