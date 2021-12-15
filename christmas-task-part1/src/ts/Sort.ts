import { app, Idata } from "./CreateElement";
import data from "./data";

class Sort {
  sortType: any;
  sortArr: [] | Idata[];
  constructor() {
    this.sortType = document.querySelector('.sort-select');
    this.sortArr = [];
  }
  sortData(data: Idata[]) {
    this.sortType.addEventListener('change', ()=> {
      console.log(this.sortType.value)
      if(this.sortType.value === 'sort-count__max') {
        this.sortArr = data.sort((a, b) => +a.count - +b.count);
      } else if(this.sortType.value === 'sort-count__min') {
        this.sortArr = data.sort((a, b) => +b.count - +a.count);
      } else if(this.sortType.value === 'sort-name__max') {
        this.sortArr = data.sort((a, b) => a.name.localeCompare(b.name));
      } else if(this.sortType.value === 'sort-name__min') {
        this.sortArr = data.sort((a, b) => b.name.localeCompare(a.name));
      }
      app.renderCard(this.sortArr);
    })
  }
}

let sortSelect = new Sort();
sortSelect.sortData(data);
