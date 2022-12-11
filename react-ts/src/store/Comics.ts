import { getApiResource } from 'api/network';
import { COMICS } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IComics, IOneComics } from 'types/comics';

interface IComicsApi {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IComics[];
}

class Comics {
  constructor() {
    makeAutoObservable(this);
  }

  comics: IComicsApi = {
    offset: 0,
    limit: 0,
    total: 0,
    count: 0,
    results: []
  };

  isLoading: boolean = false;
  currentPage: number = 1;
  searchValue: string = '';

  setPage(page: number) {
    this.currentPage = page;
  }

  async getAllComics(page: number) {
    try {
      this.isLoading = true;
      const comics = await getApiResource({ url: COMICS, offset:page*20 });
      runInAction(() => {
        this.comics = comics;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
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

  async getComicsByName(titleStartsWith: string, page:number) {
    try {
      this.isLoading = true;
      this.searchValue = titleStartsWith;
      const comics = await getApiResource({
        url: COMICS,
        titleStartsWith,
        offset: page * 20
      });
      runInAction(() => {
        this.comics = comics;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Comics();
