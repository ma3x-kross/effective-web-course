import { getApiResource } from 'api/network';
import { SERIES } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IOneSeries} from 'types/series';

class Series {
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
}
export default new Series();
