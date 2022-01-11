import { IDataStorageDecor } from './interface';

class DataStorageDecor {
  storage: IDataStorageDecor | undefined;

  constructor() {
    this.default();
  }
  default(): void {
    this.storage = {
      keysColor: [],
      keysSize: [],
      keysShape: [],
      keysYear: [],
      keysCount: [],
      favoriteDecorObj: {
        num: [],
        count: [],
      },
      showFavorite: false,
      keyOptionSelect: 0,
    };
  }
  save(): void {
    localStorage.setItem('options', JSON.stringify(this));
  }
  load(): IDataStorageDecor | undefined {
    if (localStorage.getItem('options')) {
      const options = JSON.parse(localStorage.getItem('options') || '{}');
      this.storage = { ...options.storage };
      return options.storage;
    }
  }
}

export const dataDecor = new DataStorageDecor();

export default DataStorageDecor;
