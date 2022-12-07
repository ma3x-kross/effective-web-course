export interface ISeries {
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

export interface IOneSeries {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  comics: {
    items: Array<Item>;
  };
  characters: {
    items: Array<Item>;
  };
}
