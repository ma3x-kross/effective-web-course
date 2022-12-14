import { getApiResource } from 'api/network';
import { CHARACTERS } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IOneCharacter } from 'types/character';

class Character {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;

  searchValue: string = '';

  offset: number = 0

  setOffset(offset:number){
    this.offset = offset
  }

  async setSearchValue( searchValue: string) {
    this.searchValue = searchValue
  }

  oneCharacter: IOneCharacter = {
    id: 0,
    name: '',
    description: '',
    thumbnail: {
      extension: '',
      path: ''
    },
    series: { items: [] },
    comics: { items: [] }
  };

  async getOneCharacter(id: number) {
    try {
      this.isLoading = true;
      const oneCharacter = await getApiResource({ url: `${CHARACTERS}/${id}` });
      runInAction(() => {
        if (oneCharacter) this.oneCharacter = oneCharacter.results[0];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Character();
