import { buttons } from "./Buttons";
import { app, Idata } from "./CreateElement";

class Sort {

  constructor() {
  }
  sortData(data: Idata[], indexOption: number | null) {
    if(indexOption) {
      let value = buttons.select!.options[indexOption].value;
      if(value === 'sort-count__max') {
        data.sort((a, b) => +a.count - +b.count);
      } else if(value === 'sort-count__min') {
        data.sort((a, b) => +b.count - +a.count);
      } else if(value === 'sort-name__max') {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if(value === 'sort-name__min') {
        data.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
      return data;
  }

}

export let sortSelect = new Sort();
