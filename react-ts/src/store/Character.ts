import { getApiResource } from 'api/network';
import { CHARACTERS } from 'constants/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { ICharacters, IOneCharacter } from 'types/character';

class Character {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;

  characters: Array<ICharacters> = [
    {
      id: 0,
      name: '',
      description: '',
      thumbnail: {
        extension: '',
        path: ''
      }
    }
  ];

  async getCharacters(offset: number) {
    try {
      this.isLoading = true;
      const characters = await getApiResource({ url: CHARACTERS, offset });
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
        this.oneCharacter = oneCharacter[0];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
export default new Character();
