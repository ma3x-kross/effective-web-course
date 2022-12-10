import { getApiResource } from 'api/network';
import { SERIES } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IOneSeries, ISeries } from 'types/series';

interface ICharactersApi {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ISeries[];
}

class Series {
  constructor() {
    makeAutoObservable(this);
  }

  series: ICharactersApi = {
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

  async getAllSeries(page: number) {
    try {
      this.isLoading = true;
      const series = await getApiResource({ url: SERIES, offset: page * 20 });
      runInAction(() => {
        this.series = series;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  oneSeries: IOneSeries = {
    id: 0,
    title: '',
    description: '',
    thumbnail: {
      extension: '',
      path: ''
    },
    comics: { items: [] },
    characters: { items: [] }
  };

  async getOneSeries(id: number) {
    try {
      this.isLoading = true;
      const oneSeries = await getApiResource({ url: `${SERIES}/${id}` });
      runInAction(() => {
        if (oneSeries) this.oneSeries = oneSeries.results[0];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async getSeriesByName(titleStartsWith: string, page: number) {
    try {
      this.isLoading = true;
      this.searchValue = titleStartsWith;
      const series = await getApiResource({
        url: SERIES,
        titleStartsWith,
        offset: page * 20
      });
      runInAction(() => {
        this.series = series;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Series();
