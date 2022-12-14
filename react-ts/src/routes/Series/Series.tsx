import { Button, Container, Spinner, Text } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import MyCard from 'components/MyCard';
import Search from 'components/Search';
import { ISeries } from 'types/series';
import { observer } from 'mobx-react-lite';
import seriesStore from 'store/Series';
import { VirtuosoGrid } from 'react-virtuoso';
import { ItemContainer, ListContainer } from 'components/GridComponent';
import { getApiResource } from 'api/network';
import NotFound from 'routes/NotFound';
import { SERIES } from 'constants/api';

const Series: FC = () => {
  const { searchValue, offset } = seriesStore;

  const [series, setSeries] = useState<ISeries[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [result, setResult] = useState<boolean>(false);

  const loadMore = useCallback(async () => {
    setLoading(true);
    setHasNext(true);
    seriesStore.setOffset(offset + 20);
    if (!searchValue) {
      if (offset === 0) {
        getApiResource({ url: SERIES, offset }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setSeries(res.results);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      } else {
        getApiResource({ url: SERIES, offset }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setSeries((prevState) => [...prevState, ...res.results]);
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
          url: 'series',
          titleStartsWith: searchValue,
          offset
        }).then((res) => {
          if (!res) {
            setResult(false);
          } else {
            setResult(true);
            setSeries(res.results);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      } else {
        getApiResource({
          url: SERIES,
          titleStartsWith: searchValue,
          offset
        }).then((res) => {
          if (res.total === 0) {
            setResult(false);
          } else {
            setResult(true);
            setSeries((prevState) => [...prevState, ...res.results]);
            setLoading(false);
            if (res.count < 20) {
              setHasNext(false);
            }
          }
        });
      }
    }
    console.log(hasNext);
  }, [setSeries, offset, searchValue]);

  useEffect(() => {
    setHasNext(true);
    if (!searchValue) {
      getApiResource({ url: SERIES, offset }).then((res) => {
        if (res.total === 0) {
          setResult(false);
        } else {
          setResult(true);
          setSeries(res.results);
          if (res.count < 20) {
            setHasNext(false);
          }
        }
      });
    } else {
      getApiResource({
        url: SERIES,
        titleStartsWith: searchValue,
        offset
      }).then((res) => {
        console.log(res);
        if (res.total === 0) {
          setResult(false);
        } else {
          setResult(true);
          setSeries(res.results);
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
        data={series}
        totalCount={20}
        overscan={200}
        components={{
          List: ListContainer,
          Item: ItemContainer,
          Footer: Footer
        }}
        itemContent={(index: number, seriesItem: ISeries) => {
          return (
            <MyCard
              id={seriesItem.id}
              name={seriesItem.title}
              description={seriesItem.description}
              img={`${seriesItem.thumbnail.path}.${seriesItem.thumbnail.extension}`}
              path="/series/"
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
        placeholder="Search for Series by name"
        pageName="series"
      />
      {result ? <Results /> : <NotFound />}
    </Container>
  );
};

export default observer(Series);
