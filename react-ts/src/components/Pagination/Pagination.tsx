import { observer } from 'mobx-react-lite';
import characterStore from 'store/Character';
import comicsStore from 'store/Comics';
import seriesStore from 'store/Series';

interface IPagination {
  totalCards: number;
  currentPage: number;
  pageName: string;
}

const Pagination = ({ totalCards, currentPage, pageName }: IPagination) => {


  const pageNumbers = [];
  const stylePage = {

    marginTop: '30px',
    display: 'flex',
    flexFlow: 'wrap',
    gap:'20px'
  };

  for (let i = 0; i <= Math.floor(totalCards / 20); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div style={stylePage}>
      {pageNumbers.map((page) => (
        <span
          key={page}
          style={
            currentPage === page
              ? {
                  transform: 'scale(1.5)',
                  padding: '5px 10px',
                  margin: '0 10px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }
              : {
                  
                  padding: '5px 10px',
                  margin: '0 10px',
                  cursor: 'pointer'
                }
          }
          onClick={() => {
            switch (pageName) {
              case 'characters':
                {
                  characterStore.setPage(page);
                }
                break;
              case 'comics':
                {
                  comicsStore.setPage(page)
                }
                break;
              case 'series':
                {
                  seriesStore.setPage(page)
                }
                break;
              default: {
                break;
              }
            }
          }}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default observer(Pagination);
