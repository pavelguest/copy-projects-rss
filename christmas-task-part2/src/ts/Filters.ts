import { API } from 'nouislider';
import { app, Idata } from './CreateElement';
import { saveLocal } from './SaveFiltersDecor';
import { rangeCount, rangeYear } from './slider';
import { sortSelect } from './Sort';

export interface Ifavorite {
  num: string[],
  count: string[],
}

class Filters {
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteObj: Ifavorite;

  input: HTMLElement | null;

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
    this.input = document.getElementById('favorite');
  }

  isKeys(keys: string[], key: string) {
    return keys.length ? keys.includes(key) : false;
  }

  addKey(keys: string[], key: string) {
    keys.push(key);
  }

  deleteKey(keys: string[], key: string) {
    const deleteIndex = keys.indexOf(key);
    if (deleteIndex > -1) keys.splice(deleteIndex, 1);
  }

  isFilterClear() {
    return !this.keysColor.length
        && !this.keysShape.length
        && !this.keysSize.length
        && !(this.input as HTMLInputElement).checked;
  }

  hasFavorite(num: string, count: string) {
    if (this.isKeys(this.favoriteObj.num, num) && this.isKeys(this.favoriteObj.count, count)) {
      this.deleteKey(this.favoriteObj.num, num);
      this.deleteKey(this.favoriteObj.count, count);
    } else {
      this.addKey(this.favoriteObj.num, num);
      this.addKey(this.favoriteObj.count, count);
    }
    saveLocal.favoriteObj = {
      num: [ ...this.favoriteObj.num ],
      count: [ ...this.favoriteObj.count ],
    };
    saveLocal.save();
    console.log(saveLocal.favoriteObj);

  }

  loadFavoriteCard(num: Idata) {
    return this.favoriteObj.num.length && this.favoriteObj.num.includes(num.num) ? 'active' : '';
  }

  clearKeysFiltration() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    saveLocal.keysColor = [ ...this.keysColor ];
    saveLocal.keysShape = [ ...this.keysShape ];
    saveLocal.keysSize = [ ...this.keysSize ];
    (rangeCount.noUiSlider as API).updateOptions({
      start: [1, 12],
    }, true,
    );
    (rangeYear.noUiSlider as API).updateOptions({
      start: [1940, 2020],
    }, true,
    );
    sortSelect.sortData(app.data, saveLocal.keyOptionSelect);
  }

  loadRangeSlider(minCount: string, maxCount: string, minYear: string, maxYear: string) {
    (rangeCount.noUiSlider as API).updateOptions({
      start: [minCount, maxCount],
    }, true,
    );
    (rangeYear.noUiSlider as API).updateOptions({
      start: [minYear, maxYear],
    }, true,
    );
  }
}

export default Filters;

