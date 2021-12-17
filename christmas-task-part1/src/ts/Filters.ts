import { createElement, Idata } from "./CreateElement";
import data from "./data";

class Filters {
  filterArr: [] | Idata[];
  keysColor: string[];
  keysSize: string[];
  keysShape: string[];
  data: Idata[];

  constructor() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    this.filterArr = [];
    this.data = [ ...data ];

  }
   isKeys(keys: string[], key: string) {
    return keys.length
    ? keys.includes(key)
    : false;
  }
  addKey(keys: string[], key: string) {
    keys.push(key)
    console.log(keys)
  }
  deleteKey(keys: string[], key: string) {
    let deleteIndex = keys.indexOf(key);
    if (deleteIndex > -1) keys.splice(deleteIndex, 1);
    console.log(keys)
  }
  hasKeysColor(button: HTMLElement | null) {
    if(button) {
      return (this.isKeys(this.keysColor, button.dataset.filter!))
             ? this.deleteKey(this.keysColor, button.dataset.filter!)
             : this.addKey(this.keysColor, button.dataset.filter!)
    }
  }
  hasKeysSize(button: HTMLElement | null) {
    if(button) {
      return (this.isKeys(this.keysSize, button.dataset.filter!))
             ? this.deleteKey(this.keysSize, button.dataset.filter!)
             : this.addKey(this.keysSize, button.dataset.filter!)
    }
  }
  hasKeysShape(button: HTMLElement | null) {
    if(button) {
      return (this.isKeys(this.keysShape, button.dataset.filter!))
             ? this.deleteKey(this.keysShape, button.dataset.filter!)
             : this.addKey(this.keysShape, button.dataset.filter!)
    }
  }
  filterColor() {
    this.filterArr = this.data.filter((elem)=> (this.keysColor.length > 0) ? this.keysColor.includes(elem.color) : true)
    createElement.renderCards(this.filterArr);
  }
  filterSize() {
    this.filterArr = this.data.filter((elem)=> (this.keysSize.length > 0) ? this.keysSize.includes(elem.size) : true)
    createElement.renderCards(this.filterArr);
  }
  filterShape() {
    this.filterArr = this.data.filter((elem)=> (this.keysShape.length > 0) ? this.keysShape.includes(elem.shape) : true)
    createElement.renderCards(this.filterArr);
  }


  filterFavorite(data: Idata[], input: HTMLInputElement | null) {
    if(input) {
      this.filterArr = data.filter((elem)=> input.checked ?  elem.favorite === true : false)
    }
  }
}

export let filters = new Filters();

export default Filters
