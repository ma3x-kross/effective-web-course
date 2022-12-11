export interface ICharacters {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}


interface Item {
  resourceURI: string;
  name: string;
}

export interface IOneCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  series: {
    items: Array<Item>;
  };
  comics: {
    items: Array<Item>;
  };
}
