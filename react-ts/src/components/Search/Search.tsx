import { Input } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    const debouncedSearchValue: string = useDebounce(inputSearchValue, 1000);

     const { t } = useTranslation();

    useEffect(() => {
      if (debouncedSearchValue || debouncedSearchValue === '') {
        switch (pageName) {
          case 'characters':
            {
              characterStore.setOffset(0);
              characterStore.setSearchValue(debouncedSearchValue);
            }
            break;
          case 'comics':
            {
              comicsStore.setOffset(0);
              comicsStore.setSearchValue(debouncedSearchValue);
            }
            break;
          case 'series':
            {
              seriesStore.setOffset(0);
              seriesStore.setSearchValue(debouncedSearchValue)
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
        placeholder={t(placeholder)}
        value={inputSearchValue}
        onChange={handleInputChange}
      />
    );
  }
};

export default observer(Search);
