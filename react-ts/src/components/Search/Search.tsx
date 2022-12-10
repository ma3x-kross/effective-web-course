import { Input } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import characterStore from 'store/Character';
import comicsStore from 'store/Comics';
import seriesStore from 'store/Series';
import useDebounce from './useDebounce';

interface SearchProps {
  placeholder: string;
  pageName: string;
}

const Search: FC<SearchProps> = ({ placeholder, pageName }) => {
  {
    const [inputSearchValue, setInputSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(inputSearchValue, 1000);

    useEffect(() => {
      if (debouncedSearchValue) {
        characterStore.setPage(1)
        switch (pageName) {
          case 'characters':
            {
              characterStore.getCharactersByName(debouncedSearchValue, 0);
            }
            break;
          case 'comics':
            {
              comicsStore.getComicsByName(debouncedSearchValue, 0);
            }
            break;
          case 'series':
            {
              seriesStore.getSeriesByName(debouncedSearchValue, 0);
            }
            break;
          default: {
            break;
          }
        }
      }
      if (debouncedSearchValue === '') {
        switch (pageName) {
          case 'characters':
            {
              characterStore.getCharacters(0);
            }
            break;
          case 'comics':
            {
              comicsStore.getAllComics(0);
            }
            break;
          case 'series':
            {
              seriesStore.getAllSeries(0);
            }
            break;
          default: {
            break;
          }
        }
      }
    }, [debouncedSearchValue]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputSearchValue(event.target.value);
    };

    return (
      <Input
        mb="6"
        size="lg"
        variant="filled"
        placeholder={placeholder}
        value={inputSearchValue}
        onChange={handleInputChange}
      />
    );
  }
};

export default observer(Search);
