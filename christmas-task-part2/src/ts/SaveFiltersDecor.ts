import { Ifavorite } from './Filters';

class SaveLocal {
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteObj: Ifavorite;

  isFavorite: boolean;

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
    this.isFavorite = false;
    this.keyOptionSelect = 0;
    console.log(this.favoriteObj);

  }

  save() {
    localStorage.setItem('options', JSON.stringify(this));
  }

  load() {
    if (localStorage.getItem('options')) {
      const options = JSON.parse(localStorage.getItem('options') || '{}');
      this.keysColor = options.keysColor;
      this.keysSize = options.keysSize;
      this.keysShape = options.keysShape;
      this.keysYear = options.keysYear;
      this.keysCount = options.keysCount;
      this.favoriteObj.num = [ ...options.favoriteObj.num ];
      this.favoriteObj.count = [ ...options.favoriteObj.count ];
      this.isFavorite = options.isFavorite;
      this.keyOptionSelect = options.keyOptionSelect;

      return options;

    }
  }

  default() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    this.keysYear = ['1940', '2020'];
    this.keysCount = ['1', '12'];
    this.favoriteObj = {
      num: [],
      count: [],
    };
    this.isFavorite = false;
    this.keyOptionSelect = 0;
  }
}

export const saveLocal = new SaveLocal;

export default SaveLocal;

