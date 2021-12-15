import CreateElement, { app, Idata } from "./CreateElement";
import data from "./data";

class Filtres {
  elements: NodeListOf<HTMLElement>;
  filterArr: [] | Idata[];
  resultArr: [] | Idata[];

  constructor(buttons: string) {
    this.elements = document.querySelectorAll(buttons);
    this.filterArr = [];
    this.resultArr = [];
  }

  filterData(data: Idata[]) {
    this.elements.forEach(e=> {
      e.addEventListener('click', ()=> {
        e.classList.toggle('active');
        this.filterArr = data.filter((elem) => e.dataset.filter === elem.color)
        this.resultArr = this.filterArr.concat(this.filterArr);
        console.log(this.resultArr);


        app.renderCard(this.resultArr);
      })
    })
  }
}

let colorButtons = new Filtres('.color button');
colorButtons.filterData(data);
