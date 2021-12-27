export interface ISaveSettingsTree {
  isPlay: boolean;
  isSnow: boolean;
  bg: string | undefined;
  tree: string | undefined;
}

class SaveSettingsTree {
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
  save() {
    localStorage.setItem('optionsTree', JSON.stringify(this));
  }

  load() {
    if (localStorage.getItem('optionsTree')) {
      const options = JSON.parse(localStorage.getItem('optionsTree') || '{}');
      this.isPlay = options.isPlay;
      this.isSnow = options.isSnow;
      this.bg = options.bg;
      this.tree = options.tree;

      return options;
    }
  }
}

export const saveSettingsTree = new SaveSettingsTree()
