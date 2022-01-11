import { IDataStorageTree } from './interface';

class DataStorageTree {
  storage: IDataStorageTree | undefined;

  constructor() {
    this.default();
  }

  default(): void {
    this.storage = {
      isPlay: false,
      isSnow: false,
      bg: '1',
      tree: '1',
    };
  }
  save(): void {
    localStorage.setItem('optionsTree', JSON.stringify(this));
  }

  load(): IDataStorageTree | undefined {
    if (localStorage.getItem('optionsTree')) {
      const options = JSON.parse(localStorage.getItem('optionsTree') || '{}');
      this.storage = { ...options.storage };

      return options.storage;
    }
  }
}

export const saveSettingsTree = new DataStorageTree();
