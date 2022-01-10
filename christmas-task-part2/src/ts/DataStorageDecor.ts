import { Ifavorite } from './Filters';
export interface IDataStorageDecor {
  showFavorite: boolean;
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteObj: Ifavorite;

  isFavorite: boolean;

  keyOptionSelect: number;
}

class DataStorageDecor {
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteObj: Ifavorite;

  showFavorite: boolean;

  keyOptionSelect: number;

  constructor() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    this.keysYear = [];
    this.keysCount = [];
    this.favoriteObj = {
      num: [],
      count: [],
    };
    this.showFavorite = false;
    this.keyOptionSelect = 0;
  }
  default(): void {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    this.keysYear = ['1940', '2020'];
    this.keysCount = ['1', '12'];
    this.favoriteObj = {
      num: [],
      count: [],
    };
    this.showFavorite = false;
    this.keyOptionSelect = 0;
  }
  save(): void {
    localStorage.setItem('options', JSON.stringify(this));
  }
  load(): IDataStorageDecor | undefined {
    if (localStorage.getItem('options')) {
      const options = JSON.parse(localStorage.getItem('options') || '{}');
      this.keysColor = options.keysColor;
      this.keysSize = options.keysSize;
      this.keysShape = options.keysShape;
      this.keysYear = options.keysYear;
      this.keysCount = options.keysCount;
      this.favoriteObj.num = [...options.favoriteObj.num];
      this.favoriteObj.count = [...options.favoriteObj.count];
      this.showFavorite = options.showFavorite;
      this.keyOptionSelect = options.keyOptionSelect;

      return options;
    }
  }
}

export const dataDecor = new DataStorageDecor();

export default DataStorageDecor;
