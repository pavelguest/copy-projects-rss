import { API } from 'nouislider';
import { app, Idata } from './CreateElement';
import { saveLocal } from './SaveLocalStorage';
import { rangeCount, rangeYear } from './slider';
import { sortSelect } from './Sort';

class Filters {
  keysColor: string[];

  keysSize: string[];

  keysShape: string[];

  keysYear: string[];

  keysCount: string[];

  favoriteArr: string[];

  input: HTMLElement | null;

  constructor() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    this.keysYear = [];
    this.keysCount = [];
    this.favoriteArr = [];
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

  hasFavorite(index: string) {
    if (this.isKeys(this.favoriteArr, index)) {
      this.deleteKey(this.favoriteArr, index);
    } else {
      this.addKey(this.favoriteArr, index);
    }
    saveLocal.favoriteArr = [ ...this.favoriteArr ];
    saveLocal.save();
  }

  loadFavoriteCard(num: Idata) {
    return this.favoriteArr.length && this.favoriteArr.includes(num.num) ? 'active' : '';
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

