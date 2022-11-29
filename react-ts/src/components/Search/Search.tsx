import { SearchIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input } from '@chakra-ui/react';
import { FC } from 'react';
import { SearchProps } from '../../types/SearchProps';

const Search: FC<SearchProps> = ({placeholder}) => {
  {
    return (
      <Flex alignItems="center" mb="6">
        <Input
          size="md"
          maxW="container.lg"
          variant="filled"
          placeholder={placeholder}
          mr={5}
        />
        <IconButton
          w="container.sm"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </Flex>
    );
  }
};

export default Search;
