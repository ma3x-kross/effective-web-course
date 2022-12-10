import { Center, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import MyCard from 'components/MyCard';
import Search from 'components/Search';
import { ICharacters } from 'types/character';
import { observer } from 'mobx-react-lite';
import characterStore from 'store/Character';
import Pagination from 'components/Pagination';
import { CHARACTERS } from 'constants/api';

const Characters: FC = () => {
  const {characters, isLoading, currentPage, searchValue} = characterStore

    useEffect(() => {
      if(searchValue){
        characterStore.getCharactersByName(searchValue, (currentPage-1))
      }
      else{
        characterStore.getCharacters((currentPage-1));
      }
      
    }, [currentPage]);
  
    return (
      <Container maxW="container.xl" p={6}>
        <Search placeholder="Search for Characters by name" pageName='characters'/>
        {isLoading === true ? (
          <Center>
            <Spinner size="xl" thickness="4px"></Spinner>
          </Center>
        ) : (
          
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {characters.results.map(
              ({
                id,
                name,
                description,
                thumbnail: { extension, path }
              }: ICharacters) => (
                <MyCard
                  key={id}
                  id={id}
                  name={name}
                  description={description}
                  img={`${path}.${extension}`}
                  path="/characters/"
                ></MyCard>
              )
            )}
          </SimpleGrid>
        )}
        <Center>
          <Pagination totalCards={characters.total} currentPage={currentPage} pageName={CHARACTERS}/>
        </Center>
      </Container>
    );
};

export default observer(Characters);
