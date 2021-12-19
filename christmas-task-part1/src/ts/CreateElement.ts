import { buttons } from "./Buttons";
import data from "./data";
import { otherFilters } from "./OtherFilters";
import { rangeCount } from "./slider";
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
      <div class="cards__item ${otherFilters.loadFavoriteCard(e)}">
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
    this.addListenerForCards();

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
        sortSelect.sortData(this.data, event.target);
        console.log(buttons.select!.options[buttons.select!.selectedIndex].value);
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
    buttons.defaultSettings!.onclick = (event) => {
      if(event.target instanceof HTMLElement) {
        otherFilters.clearKeysFiltration();
        buttons.cancelTargetButtons();

        this.filtration()
      }
    }
  }
  addListenerForCards() {
    document.querySelectorAll('.cards__item').forEach((card, index) => {
      let cardNum = this.filterArr[index];

      card.addEventListener('click', () => {
        if(otherFilters.favoriteArr.length <= 19) {
          otherFilters.hasFavorite(cardNum.num);
          card.classList.toggle('active');
          buttons.changeFavoriteSpanValue(otherFilters.favoriteArr)
          console.log(otherFilters.favoriteArr);
        } else {
          card.classList.remove('active');
          otherFilters.deleteKey(otherFilters.favoriteArr, cardNum.num);
          if(otherFilters.favoriteArr.length > 19) {
            buttons.createAlertWindow();
          }
        }

      })
    })
  }
  filtration() {
    let [minYear, maxYear] = otherFilters.keysYear;
    let [minCount, maxCount] = otherFilters.keysCount;
    buttons.changeInputValues(minCount, maxCount, minYear, maxYear);
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
// createElement.addListenerForCards();

export default CreateElement;
