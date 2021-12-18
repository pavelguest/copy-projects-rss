import { buttons } from "./Buttons";
import data from "./data";
import { otherFilters } from "./OtherFilters";
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
  data: Idata[];
  filterArr: [] | Idata[];

  constructor() {
    this.container = document.querySelector('.cards') as HTMLElement;
    this.data = [ ...data ];
    this.filterArr = [ ...data ];
  }

  renderCards(data: Idata[]) {
    this.container.innerHTML = '';
    if(!data.length) this.container.insertAdjacentHTML('beforeend', `<h3 class="error__subtitle">Извините, совпадений не обнаружено</h3>`)
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
    buttons.color!.onclick = (event) => {
      if(event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysColor(event.target);
        this.filtration();
      }
    }
    buttons.size!.onclick = (event) => {
      if(event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysSize(event.target);
        this.filtration();
      }
    }
    buttons.shape!.onclick = (event) => {
      if(event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysShape(event.target);
        this.filtration();
      }
    }
    buttons.favorite!.onclick = (event) => {
      console.log(event.target)
      this.filtration();
        }
    buttons.select!.onchange = (event) => {
      if(event.target instanceof HTMLSelectElement) {
        if(!this.filterArr.length){
          this.filterArr = [ ...data ];
        }
        sortSelect.sortData(this.filterArr, event.target);
      }
    }
    buttons.rangeYear.on('update', (values: string[]) => {
      otherFilters.hasKeysYear(values);
      this.filtration()
    })
    buttons.rangeCount.on('update', (values: string[]) => {
      otherFilters.hasKeysCount(values);
      this.filtration()
    })

  }
  filtration() {
    let [minYear, maxYear] = otherFilters.keysYear;
    let [minCount, maxCount] = otherFilters.keysCount;
    buttons.inputCountMin!.textContent = ((+minCount * 100) / 100).toString();
    buttons.inputCountMax!.textContent = ((+maxCount * 100) / 100).toString();
    buttons.inputYearMin!.textContent = ((+minYear * 100) / 100).toString();
    buttons.inputYearMax!.textContent = ((+maxYear * 100) / 100).toString();
    this.filterArr = this.data.filter(elem => +elem.year >= +minYear && +elem.year <= +maxYear && +elem.count >= +minCount && +elem.count <= +maxCount);

    if(otherFilters.isFilterClear()) {
      this.filterArr = [ ...this.filterArr ];
    } else this.filterArr = this.filterArr.filter(elem => {
      return otherFilters.filterColor(elem)
          && otherFilters.filterSize(elem)
          && otherFilters.filterShape(elem)
          && otherFilters.filterFavorite(elem)

        });
        this.renderCards(this.filterArr);
  }
}

export const createElement = new CreateElement();

createElement.renderCards(data);
createElement.addListenerForButtons();

export default CreateElement;

