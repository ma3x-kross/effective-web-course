import { Button, Container, Spinner, Text } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import MyCard from 'components/MyCard';
import Search from 'components/Search';
import { ICharacters } from 'types/character';
import { observer } from 'mobx-react-lite';
import characterStore from 'store/Character';
import { VirtuosoGrid } from 'react-virtuoso';
import { ItemContainer, ListContainer } from 'components/GridComponent';
import { getApiResource } from 'api/network';
import NotFound from 'routes/NotFound';
import { CHARACTERS } from 'constants/api';

const Characters: FC = () => {
  const { searchValue, offset } = characterStore;

  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [result, setResult] = useState<boolean>(false);

  const loadMore = useCallback(async () => {
    setLoading(true);
    setHasNext(true);
    characterStore.setOffset(offset + 20);
    if (!searchValue) {
      if (offset === 0) {
        getApiResource({ url: CHARACTERS, offset }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setCharacters(res.results);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      } else {
        getApiResource({ url: CHARACTERS, offset }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setCharacters((prevState) => [...prevState, ...res.results]);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      }
    } else {
      if (offset === 0) {
        getApiResource({
          url: 'characters',
          nameStartsWith: searchValue,
          offset
        }).then((res) => {
          if (!res) {
            setResult(false);
          } else {
            setResult(true);
            setCharacters(res.results);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      } else {
        getApiResource({
          url: CHARACTERS,
          nameStartsWith: searchValue,
          offset
        }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setCharacters((prevState) => [...prevState, ...res.results]);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      }
    }
    console.log(hasNext);
  }, [setCharacters, offset, searchValue]);

  useEffect(() => {
    setHasNext(true);
    if (!searchValue) {
      getApiResource({ url: CHARACTERS, offset }).then((res) => {
        if (res.total === 0) {
          setResult(false);
        } else {
          setResult(true);
          setCharacters(res.results);
          if (res.count < 20) {
            setHasNext(false);
          }
        }
      });
    } else {
      getApiResource({
        url: CHARACTERS,
        nameStartsWith: searchValue,
        offset
      }).then((res) => {
        console.log(res);
        if (res.total === 0) {
          setResult(false);
        } else {
          setResult(true);
          setCharacters(res.results);
          if (res.count < 20) {
            setHasNext(false);
          }
        }
      });
    }
    console.log(hasNext);
  }, [searchValue]);

  const height = window.innerHeight;

  const Results = () => {
    return (
      <VirtuosoGrid
        context={{ loadMore, loading }}
        style={{ width: '100% ', height: height }}
        useWindowScroll
        data={characters}
        totalCount={20}
        overscan={200}
        components={{
          List: ListContainer,
          Item: ItemContainer,
          Footer: Footer
        }}
        itemContent={(index: number, character: ICharacters) => {
          return (
            <MyCard
              id={character.id}
              name={character.name}
              description={character.description}
              img={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              path="/characters/"
            ></MyCard>
          );
        }}
      ></VirtuosoGrid>
    );
  };

  const Footer = ({ context: { loadMore, loading } }: any) => {
    if (!hasNext) {
      return (
        <div
          style={{
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Text fontWeight={600} fontSize="xl">The data is ended</Text>
        </div>
      );
    }
    return (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <>
          {loading ? (
            <Spinner size="lg" thickness="4px"></Spinner>
          ) : (
            <Button size="lg" disabled={loading} onClick={loadMore}>
              Press to load more
            </Button>
          )}
        </>
      </div>
    );
  };
  return (
    <Container maxW="container.xl" p={6}>
      <Search
        placeholder="Search for Characters by name"
        pageName="characters"
      />
      {result ? <Results /> : <NotFound />}
    </Container>
  );
};

export default observer(Characters);
