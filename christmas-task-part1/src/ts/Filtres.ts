import { createElement, Idata } from "./CreateElement";
import data from "./data";

class Filtres {
  buttons: NodeListOf<HTMLElement>;
  filterArr: [] | Idata[];
  resultArr: [] | Idata[];

  constructor(buttons: string) {
    this.buttons = document.querySelectorAll(buttons);
    this.filterArr = [];
    this.resultArr = [];
  }

  filterData(data: Idata[]) {
    this.buttons.forEach(button=> {
      button.addEventListener('click', ()=> {
        button.classList.toggle('active');
        this.filterArr = data.filter((elem) => button.dataset.filter === elem.color)
        this.resultArr = [...this.resultArr, ...this.filterArr]
        console.log(this.resultArr);


        createElement.renderCards(this.resultArr);
      })
    })
  }
}

let colorButtons = new Filtres('.color button');
colorButtons.filterData(data);
