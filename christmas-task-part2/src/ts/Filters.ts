import { API } from 'nouislider';
import { app, Idata } from './Application';
import { buttonsDecor } from './ButtonsDecor';
import { dataDecor } from './DataStorageDecor';
import { rangeCount, rangeYear } from './slider';
import { sortSelect } from './Sort';

export interface Ifavorite {
  num: string[];
  count: string[];
}

class Filters {
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteObj: Ifavorite;

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
  }

  deleteKey(keys: string[], key: string): void {
    const deleteIndex = keys.indexOf(key);
    if (deleteIndex > -1) keys.splice(deleteIndex, 1);
  }

  isFilterClear(): boolean {
    return (
      !this.keysColor.length &&
      !this.keysShape.length &&
      !this.keysSize.length &&
      !(buttonsDecor.favorite as HTMLInputElement).checked
    );
  }

  setFavoriteCards(num: string, count: string): void {
    if (
      this.favoriteObj.num.includes(num) &&
      this.favoriteObj.count.includes(count)
    ) {
      this.deleteKey(this.favoriteObj.num, num);
      this.deleteKey(this.favoriteObj.count, count);
    } else {
      this.favoriteObj.num.push(num);
      this.favoriteObj.count.push(count);
    }
    dataDecor.favoriteObj = {
      num: [...this.favoriteObj.num],
      count: [...this.favoriteObj.count],
    };
    dataDecor.save();
  }

  getActiveClassForCards(num: Idata): string {
    return this.favoriteObj.num.length && this.favoriteObj.num.includes(num.num)
      ? 'active'
      : '';
  }

  clearKeysFiltration(): void {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    dataDecor.keysColor = [];
    dataDecor.keysShape = [];
    dataDecor.keysSize = [];
    (rangeCount.noUiSlider as API).updateOptions(
      {
        start: [1, 12],
      },
      true
    );
    (rangeYear.noUiSlider as API).updateOptions(
      {
        start: [1940, 2020],
      },
      true
    );
    sortSelect.sortData(app.data, dataDecor.keyOptionSelect);
  }

  loadRangeSlider(
    minCount: string,
    maxCount: string,
    minYear: string,
    maxYear: string
  ): void {
    (rangeCount.noUiSlider as API).updateOptions(
      {
        start: [minCount, maxCount],
      },
      true
    );
    (rangeYear.noUiSlider as API).updateOptions(
      {
        start: [minYear, maxYear],
      },
      true
    );
  }
}

export default Filters;
