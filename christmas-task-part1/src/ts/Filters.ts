import { createElement, Idata } from "./CreateElement";
import { rangeCount, rangeYear } from "./slider";

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
    keys.push(key)
  }
  deleteKey(keys: string[], key: string) {
    let deleteIndex = keys.indexOf(key);
    if (deleteIndex > -1) keys.splice(deleteIndex, 1);
  }
  isFilterClear() {
    return !this.keysColor.length
        && !this.keysShape.length
        && !this.keysSize.length
        && !(this.input as HTMLInputElement).checked
  }
  hasFavorite(index: string) {
    if(!this.isKeys(this.favoriteArr, index)) {
      this.addKey(this.favoriteArr, index)
    } else this.deleteKey(this.favoriteArr, index);
  }
  loadFavoriteCard(num: Idata) {
    return this.favoriteArr.length && this.favoriteArr.includes(num.num) ? 'active' : '';
  }
  clearKeysFiltration() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    rangeCount.noUiSlider!.updateOptions({
      start: [1, 12],
    }, true
    );
    rangeYear.noUiSlider!.updateOptions({
      start: [1940, 2020],
    }, true
    );
  }
}

export default Filters

