import { getApiResource } from 'api/network';
import { SERIES } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IOneSeries, ISeries } from 'types/series';

class Series {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;

  series: Array<ISeries> = [
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

  async getAllSeries(offset: number) {
    try {
      this.isLoading = true;
      const series = await getApiResource({ url: SERIES, offset });
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
        this.oneSeries = oneSeries[0];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Series();
