import { createElement, Idata } from "./CreateElement";

class Sort {

  constructor() {
  }
  sortData(data: Idata[], select: HTMLSelectElement | null) {
    if(select) {
      console.log(select.value)
      if(select.value === 'sort-count__max') {
        data.sort((a, b) => +a.count - +b.count);
      } else if(select.value === 'sort-count__min') {
        data.sort((a, b) => +b.count - +a.count);
      } else if(select.value === 'sort-name__max') {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if(select.value === 'sort-name__min') {
        data.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
      createElement.renderCards(data);
  }
  
}

export let sortSelect = new Sort();
