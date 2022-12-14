import { Button, Container, Spinner, Text } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import MyCard from 'components/MyCard';
import Search from 'components/Search';
import { IComics } from 'types/comics';
import comicsStore from 'store/Comics';
import { observer } from 'mobx-react-lite';
import { COMICS } from 'constants/api';
import { getApiResource } from 'api/network';
import { VirtuosoGrid } from 'react-virtuoso';
import { ItemContainer, ListContainer } from 'components/GridComponent';
import NotFound from 'routes/NotFound';

const Comics: FC = () => {
  const { searchValue, offset } = comicsStore;

  const [comics, setComics] = useState<IComics[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [result, setResult] = useState<boolean>(false);

  const loadMore = useCallback(async () => {
    setLoading(true);
    setHasNext(true);
    comicsStore.setOffset(offset + 20);
    if (!searchValue) {
      if (offset === 0) {
        getApiResource({ url: COMICS, offset }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setComics(res.results);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      } else {
        getApiResource({ url: COMICS, offset }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setComics((prevState) => [...prevState, ...res.results]);
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
          url: COMICS,
          titleStartsWith: searchValue,
          offset
        }).then((res) => {
          if (!res) {
            setResult(false);
          } else {
            setResult(true);
            setComics(res.results);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      } else {
        getApiResource({
          url: COMICS,
          titleStartsWith: searchValue,
          offset
        }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setComics((prevState) => [...prevState, ...res.results]);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      }
    }
    console.log(hasNext);
  }, [setComics, offset, searchValue]);

  useEffect(() => {
    setHasNext(true);
    if (!searchValue) {
      getApiResource({ url: COMICS, offset }).then((res) => {
        if (res.total === 0) {
          setResult(false);
        } else {
          setResult(true);
          setComics(res.results);
          if (res.count < 20) {
            setHasNext(false);
          }
        }
      });
    } else {
      getApiResource({
        url: COMICS,
        titleStartsWith: searchValue,
        offset
      }).then((res) => {
        console.log(res);
        if (res.total === 0) {
          setResult(false);
        } else {
          setResult(true);
          setComics(res.results);
          if (res.count < 20) {
            setHasNext(false);
          }
        }
        console.log(res)
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
        data={comics}
        totalCount={20}
        overscan={200}
        components={{
          List: ListContainer,
          Item: ItemContainer,
          Footer: Footer
        }}
        itemContent={(index: number, comicsItem: IComics) => {
          return (
            <MyCard
              id={comicsItem.id}
              name={comicsItem.title}
              description={comicsItem.description}
              img={`${comicsItem.thumbnail.path}.${comicsItem.thumbnail.extension}`}
              path="/comics/"
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
          <Text fontWeight={600} fontSize="xl">
            The data is ended
          </Text>
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
        placeholder="Search for Comics by name"
        pageName="comics"
      />
      {result ? <Results /> : <NotFound />}
    </Container>
  );
  
};

export default observer(Comics);
