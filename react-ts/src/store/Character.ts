import { getApiResource } from 'api/network';
import { CHARACTERS } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { ICharacters, IOneCharacter } from 'types/character';

interface ICharactersApi {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ICharacters[];
}

class Character {
  constructor() {
    makeAutoObservable(this);
  }

  characters: ICharactersApi = {
    offset: 0,
    limit: 0,
    total: 0,
    count: 0,
    results: []
  };

  isLoading: boolean = false;
  currentPage: number = 1
  searchValue: string = ''

  setPage(page:number){
    this.currentPage = page
  }

  async getCharacters(page: number) {
    try {
      this.isLoading = true;
      const characters = await getApiResource({ url: CHARACTERS, offset:page*20 });
      runInAction(() => {
        this.characters = characters;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
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

  async getCharactersByName(nameStartsWith: string, page:number) {
    try {
      this.isLoading = true;
      this.searchValue = nameStartsWith
      const characters = await getApiResource({
        url: CHARACTERS,
        nameStartsWith,
        offset: page * 20
      });
      runInAction(() => {
        this.characters = characters;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Character();
