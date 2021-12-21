import { API } from 'nouislider';
import { buttonsDecor } from './ButtonsDecor';
import data from './data';
import { otherFilters } from './OtherFilters';
import { saveLocal } from './SaveLocalStorage';
import { rangeCount, rangeYear } from './slider';
import { sortSelect } from './Sort';
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
class Application {
  container: HTMLElement;

  data: Idata[];

  filterArr: [] | Idata[];

  searchArr: Idata[];

  constructor() {
    this.container = document.querySelector('.cards') as HTMLElement;
    this.data = [ ...data ];
    this.filterArr = [ ...data ];
    this.searchArr = [ ...data ];
  }

  renderCards(renderData: Idata[]) {
    this.container.innerHTML = '';
    if (!renderData.length) this.container.insertAdjacentHTML('beforeend', '<h3 class="error__subtitle">Извините, совпадений не обнаружено</h3>');
    renderData.forEach(e => {
      this.container.insertAdjacentHTML('beforeend', `
      <div class="cards__item ${otherFilters.loadFavoriteCard(e)}">
      <h3 class="cards__subtitle">${e.name}</h3>
      <img class="cards__img" src="./assets/toys/${e.num}.png" alt="decoration">
      <div class="cards__text-container">
      <p class="cards__text">Количество: ${e.count}</p>
      <p class="cards__text">Год покупки: ${e.year}</p>
      <p class="cards__text">Форма: ${e.shape}</p>
      <p class="cards__text">Цвет: ${e.color}</p>
      <p class="cards__text">Размер: ${e.size}</p>
      <p class="cards__text">Любимый: ${e.favorite ? 'да' : 'нет'}</p>
      </div>
      </div>
      `);
    });
    this.addListenerForCards();

  }

  addListenerForButtons() {
    (buttonsDecor.color as HTMLElement).onclick = (event) => {
      if (event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysColor(event.target);
        this.filtration();
      }
    };
    (buttonsDecor.size as HTMLElement).onclick = (event) => {
      if (event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysSize(event.target);
        this.filtration();
      }
    };
    (buttonsDecor.shape as HTMLElement).onclick = (event) => {
      if (event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysShape(event.target);
        this.filtration();
      }
    };
    (buttonsDecor.favorite as HTMLElement).onclick = (event) => {
      saveLocal.isFavorite = (event.target as HTMLInputElement).checked;
      saveLocal.save();
      this.filtration();
    };
    (buttonsDecor.select as HTMLSelectElement).onchange = (event) => {
      if (event.target instanceof HTMLSelectElement) {
        const sortData = sortSelect.sortData(this.filterArr, event.target.options.selectedIndex);
        this.renderCards(sortData);
        saveLocal.keyOptionSelect = event.target.selectedIndex;
        saveLocal.save();
      }
    };
    (<API>rangeYear.noUiSlider).on('update', (values: (string | number)[]) => {
      const [ minYear, maxYear ] = values;
      saveLocal.keysYear = [ (minYear as string), (maxYear as string) ];
      saveLocal.save();
      otherFilters.hasKeysYear(minYear, maxYear);
      this.filtration();
    });
    (<API>rangeCount.noUiSlider).on('update', (values: (string | number)[]) => {
      const [ minCount, maxCount ] = values;
      saveLocal.keysCount = [ (minCount as string), (maxCount as string) ];
      saveLocal.save();
      otherFilters.hasKeysCount(minCount, maxCount);
      this.filtration();
    });
    (buttonsDecor.defaultSettings as HTMLElement).onclick = (event) => {
      if (event.target instanceof HTMLElement) {
        otherFilters.clearKeysFiltration();
        buttonsDecor.cancelTargetButtons();
        (buttonsDecor.searchInput as HTMLInputElement).value = '';
        saveLocal.keyOptionSelect = 0;
        saveLocal.save();
        this.filtration();
      }
    };
    (buttonsDecor.searchInput as HTMLInputElement).oninput = (event) => {
      if (event.target instanceof HTMLInputElement) {
        const pattern = event.target.value.split(' ').map((elem) => {
          return `(.*${elem})`;
        }).join('');
        const regex = new RegExp(`${pattern}`, 'gi');
        this.searchArr = this.filterArr.filter(card => card.name.match(regex));
        this.renderCards(this.searchArr);
      }
    };
    (buttonsDecor.searchCancel as HTMLElement).onclick = (event) => {
      (buttonsDecor.searchInput as HTMLInputElement).value = '';
      this.filtration();
    };
    (buttonsDecor.resetLocal  as HTMLElement).onclick = (event) => {
      saveLocal.default();
      saveLocal.save();
    };
    buttonsDecor.searchInput?.focus();
  }

  addListenerForCards() {
    document.querySelectorAll('.cards__item').forEach((card, index) => {
      const cardNum = this.filterArr[index];

      card.addEventListener('click', () => {
        if (otherFilters.favoriteArr.length <= 19) {
          otherFilters.hasFavorite(cardNum.num);
          card.classList.toggle('active');
        } else {
          card.classList.remove('active');
          otherFilters.deleteKey(otherFilters.favoriteArr, cardNum.num);
          if (otherFilters.favoriteArr.length > 19) {
            buttonsDecor.createAlertWindow();
          }
        }
        buttonsDecor.changeFavoriteSpanValue(otherFilters.favoriteArr);
      });
    });
  }

  filtration() {
    const [minYear, maxYear] = otherFilters.keysYear;
    const [minCount, maxCount] = otherFilters.keysCount;
    buttonsDecor.changeInputValues(minCount, maxCount, minYear, maxYear);
    this.filterArr = this.data.filter(elem => +elem.year >= +minYear && +elem.year <= +maxYear && +elem.count >= +minCount && +elem.count <= +maxCount);

    if (otherFilters.isFilterClear()) {
      this.filterArr = [ ...this.filterArr ];
    } else this.filterArr = this.filterArr.filter(elem => {
      return otherFilters.filterColor(elem)
          && otherFilters.filterSize(elem)
          && otherFilters.filterShape(elem)
          && otherFilters.filterFavorite(elem);

    });
    this.renderCards(this.filterArr);
  }

  setData() {
    const saveData = saveLocal.load();
    if (saveData) {
      otherFilters.keysColor = saveData.keysColor;
      otherFilters.keysSize = saveData.keysSize;
      otherFilters.keysShape = saveData.keysShape;
      otherFilters.favoriteArr = saveData.favoriteArr;
      if (saveData.keyOptionSelect !== 0) {
        this.filterArr = sortSelect.sortData(this.data, saveData.keyOptionSelect);
      }
      (buttonsDecor.favoriteCountSpan as HTMLElement).textContent = `${otherFilters.favoriteArr.length}`;

      buttonsDecor.loadTargetButtons();
      const [minYear, maxYear] = saveData.keysYear;
      const [minCount, maxCount] = saveData.keysCount;
      otherFilters.loadRangeSlider(minCount, maxCount, minYear, maxYear);
      (otherFilters.input as HTMLInputElement).checked = saveData.isFavorite;
    }
  }
}

export const app = new Application();



export default Application;

