import { getApiResource } from 'api/network';
import { COMICS } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IComics, IOneComics } from 'types/comics';

class Comics {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;

  comics: Array<IComics> = [
    {
      id: 0,
      title: '',
      description: '',
      thumbnail: {
        extension: '',
        path: ''
      }
    }
  ];

  async getAllComics(offset: number) {
    try {
      this.isLoading = true;
      const comics = await getApiResource({ url: COMICS, offset });
      runInAction(() => {
        this.comics = comics.results;
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
        if(oneComics)
        this.oneComics = oneComics.results[0];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async getComicsByName(titleStartsWith: string) {
    try {
      this.isLoading = true;
      const comics = await getApiResource({ url: COMICS, titleStartsWith });
      runInAction(() => {
        this.comics = comics.results;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Comics();
