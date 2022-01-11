export interface Idata {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}
export interface Ifavorite {
  num: string[];
  count: string[];
}

export interface IobjKeys {
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteDecorObj: Ifavorite;
}

export interface IDataStorageDecor {
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteDecorObj: Ifavorite;

  showFavorite: boolean;

  keyOptionSelect: number;
}

export interface IDataStorageTree {
  isPlay: boolean;
  isSnow: boolean;
  bg: string | undefined;
  tree: string | undefined;
}
