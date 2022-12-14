import { getApiResource } from 'api/network';
import { COMICS } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IOneComics } from 'types/comics';

class Comics {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;

  searchValue: string = '';

  offset: number = 0;

  setOffset(offset: number) {
    this.offset = offset;
  }

  async setSearchValue(searchValue: string) {
    this.searchValue = searchValue;
  }

  oneComics: IOneComics = {
    id: 0,
    title: '',
    description: '',
    thumbnail: {
      extension: '',
      path: ''
    },
    series: {
      resourceURI: '',
      name: ''
    },
    characters: { items: [] }
  };

  async getOneComics(id: number) {
    try {
      this.isLoading = true;
      const oneComics = await getApiResource({ url: `${COMICS}/${id}` });
      runInAction(() => {
        if (oneComics) this.oneComics = oneComics.results[0];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Comics();
