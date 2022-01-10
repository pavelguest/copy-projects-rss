export interface IDataStorageTree {
  isPlay: boolean;
  isSnow: boolean;
  bg: string | undefined;
  tree: string | undefined;
}

class DataStorageTree {
  isPlay: boolean;

  isSnow: boolean;

  bg: string | undefined;

  tree: string | undefined;

  constructor() {
    this.isPlay = false;
    this.isSnow = false;
    this.bg = '1';
    this.tree = '1';
  }

  save(): void {
    localStorage.setItem('optionsTree', JSON.stringify(this));
  }

  load(): IDataStorageTree | undefined {
    if (localStorage.getItem('optionsTree')) {
      const options = JSON.parse(localStorage.getItem('optionsTree') || '{}');
      this.isPlay = options.isPlay;
      this.isSnow = options.isSnow;
      this.bg = options.bg;
      this.tree = options.tree;

      return options;
    }
  }

  default(): void {
    this.isPlay = false;
    this.isSnow = false;
    this.bg = '1';
    this.tree = '1';
  }
}

export const saveSettingsTree = new DataStorageTree();
