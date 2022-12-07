export interface IComics {
  id: number;
  title: string;
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

export interface IOneComics {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  series: Item;
  characters: {
    items: Array<Item>;
  };
}