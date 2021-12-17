import data from "./data";
import Filters, { filters } from "./Filters";
import { sortSelect } from "./Sort";

export interface Idata {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}
class CreateElement {
  container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.cards') as HTMLElement;
  }

  renderCards(data: Idata[]) {
    this.container.innerHTML = '';
    data.forEach(e => {
      this.container.insertAdjacentHTML('beforeend', `
        <div class="cards__item">
          <h3 class="cards__subtitle">${e.name}</h3>
          <img class="cards__img" src="../assets/toys/${e.num}.png" alt="decoration">
          <div class="cards__text-container">
            <p class="cards__text">Количество: ${e.count}</p>
            <p class="cards__text">Год покупки: ${e.year}</p>
            <p class="cards__text">Форма: ${e.shape}</p>
            <p class="cards__text">Цвет: ${e.color}</p>
            <p class="cards__text">Размер: ${e.size}</p>
            <p class="cards__text">Любимый: ${e.favorite? 'да' : 'нет'}</p>
          </div>
        </div>
      `)
    })
  }

  addListenerForButtons() {
      document.querySelector<HTMLElement>('.color')!.onclick = (event) => {
      if(event.target instanceof HTMLElement) {
        event.target.classList.toggle('active');
        filters.hasKeysColor(event.target);
        filters.filterColor();

      }
    }
    document.querySelector<HTMLElement>('.size')!.onclick = (event) => {
      if(event.target instanceof HTMLElement) {
        event.target.classList.toggle('active');
        filters.hasKeysSize(event.target);
        filters.filterSize();

      }
    }
    document.querySelector<HTMLElement>('.shape')!.onclick = (event) => {
      if(event.target instanceof HTMLElement) {
        event.target.classList.toggle('active');
        filters.hasKeysShape(event.target);
        filters.filterShape();
      
      }
    }
    // document.querySelector<HTMLSelectElement>('.sort-select')!.onchange = (event) => {
    //   if(event.target instanceof HTMLSelectElement) {
    //     sortSelect.sortData(data, event.target);
    //   }
    // }
    // document.querySelector<HTMLInputElement>('.favorite__input')!.onchange = (event) => {
    //   if(event.target instanceof HTMLInputElement) {
    //     filters.filterFavorite(data, event.target)
    //   }
    // }
  }
}

export const createElement = new CreateElement();
createElement.renderCards(data);
createElement.addListenerForButtons();
export default CreateElement;
