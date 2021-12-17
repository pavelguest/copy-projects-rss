import { createElement, Idata } from "./CreateElement";
import data from "./data";

class Sort {
  sortType: HTMLSelectElement;
  sortArr: [] | Idata[];
  constructor() {
    this.sortType = document.querySelector('.sort-select') as HTMLSelectElement;
    this.sortArr = [];
  }
  sortData(data: Idata[], select: HTMLSelectElement | null) {
    if(select) {
      console.log(select.value)
      if(select.value === 'sort-count__max') {
        this.sortArr = data.sort((a, b) => +a.count - +b.count);
      } else if(select.value === 'sort-count__min') {
        this.sortArr = data.sort((a, b) => +b.count - +a.count);
      } else if(select.value === 'sort-name__max') {
        this.sortArr = data.sort((a, b) => a.name.localeCompare(b.name));
      } else if(select.value === 'sort-name__min') {
        this.sortArr = data.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
      createElement.renderCards(this.sortArr);
  }
}

export let sortSelect = new Sort();
