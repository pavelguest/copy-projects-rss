import { API } from 'nouislider';
import { buttonsDecor } from './ButtonsDecor';
import data from './data';
import { otherFilters } from './OtherFilters';
import { dataDecor } from './DataStorageDecor';
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
    this.data = [...data];
    this.filterArr = [...data];
    this.searchArr = [...data];
  }

  renderCards(renderData: Idata[]) {
    this.container.innerHTML = '';
    if (!renderData.length)
      this.container.insertAdjacentHTML(
        'beforeend',
        '<h3 class="error__subtitle">Извините, совпадений не обнаружено</h3>'
      );
    renderData.forEach((e) => {
      this.container.insertAdjacentHTML(
        'beforeend',
        `
      <div class="cards__item ${otherFilters.getActiveClassForCards(e)}">
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
      `
      );
    });
    this.addListenerForCards();
  }

  addListenerForButtons(): void {
    buttonsDecor.color!.onclick = (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target !== event.currentTarget
      ) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysColor(event.target.dataset.filter);
        this.filtration();
      }
    };
    (buttonsDecor.size as HTMLElement).onclick = (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target !== event.currentTarget
      ) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysSize(event.target.dataset.filter);
        this.filtration();
      }
    };
    (buttonsDecor.shape as HTMLElement).onclick = (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target !== event.currentTarget
      ) {
        event.target.classList.toggle('active');
        otherFilters.hasKeysShape(event.target.dataset.filter);
        this.filtration();
      }
    };
    (buttonsDecor.favorite as HTMLElement).onclick = (event) => {
      dataDecor.showFavorite = (event.target as HTMLInputElement).checked;
      dataDecor.save();
      this.filtration();
    };
    (buttonsDecor.select as HTMLSelectElement).onchange = (event) => {
      if (event.target instanceof HTMLSelectElement) {
        const sortData = sortSelect.sortData(
          this.filterArr,
          event.target.options.selectedIndex
        );
        this.renderCards(sortData);
        dataDecor.keyOptionSelect = event.target.selectedIndex;
        dataDecor.save();
      }
    };
    (<API>rangeYear.noUiSlider).on('update', (values: (string | number)[]) => {
      const [minYear, maxYear] = values;
      dataDecor.keysYear = [minYear as string, maxYear as string];
      dataDecor.save();
      otherFilters.hasKeysYear(minYear.toString(), maxYear.toString());
      this.filtration();
    });
    (<API>rangeCount.noUiSlider).on('update', (values: (string | number)[]) => {
      const [minCount, maxCount] = values;
      dataDecor.keysCount = [minCount as string, maxCount as string];
      dataDecor.save();
      otherFilters.hasKeysCount(minCount.toString(), maxCount.toString());
      this.filtration();
    });
    (buttonsDecor.defaultSettings as HTMLElement).onclick = (event) => {
      if (event.target instanceof HTMLElement) {
        otherFilters.clearKeysFiltration();
        buttonsDecor.cancelTargetButtons();
        (buttonsDecor.searchInput as HTMLInputElement).value = '';
        dataDecor.keyOptionSelect = 0;
        dataDecor.save();
        this.filtration();
      }
    };
    (buttonsDecor.searchInput as HTMLInputElement).oninput = (event) => {
      if (event.target instanceof HTMLInputElement) {
        const pattern = event.target.value
          .split(' ')
          .map((elem) => {
            return `(.*${elem})`;
          })
          .join('');
        const regex = new RegExp(`${pattern}`, 'gi');
        this.searchArr = this.filterArr.filter((card) =>
          card.name.match(regex)
        );
        this.renderCards(this.searchArr);
      }
    };
    (buttonsDecor.searchCancel as HTMLElement).onclick = () => {
      (buttonsDecor.searchInput as HTMLInputElement).value = '';
      this.filtration();
    };
    (buttonsDecor.resetLocal as HTMLElement).onclick = () => {
      dataDecor.default();
      dataDecor.save();
    };
    buttonsDecor.searchInput?.focus();
  }

  addListenerForCards(): void {
    document.querySelectorAll('.cards__item').forEach((card, index) => {
      const cardNum = this.filterArr[index];

      card.addEventListener('click', () => {
        if (
          otherFilters.favoriteObj.num.length <= 19 &&
          otherFilters.favoriteObj.count.length <= 19
        ) {
          otherFilters.setFavoriteCards(cardNum.num, cardNum.count);
          card.classList.toggle('active');
        } else {
          card.classList.remove('active');
          otherFilters.deleteKey(otherFilters.favoriteObj.num, cardNum.num);
          otherFilters.deleteKey(otherFilters.favoriteObj.count, cardNum.count);
          if (otherFilters.favoriteObj.num.length > 19) {
            buttonsDecor.createAlertWindow();
          }
        }
        buttonsDecor.changeFavoriteSpanValue(otherFilters.favoriteObj.num);
      });
    });
  }

  filtration(): void {
    const [minYear, maxYear] = otherFilters.keysYear;
    const [minCount, maxCount] = otherFilters.keysCount;
    buttonsDecor.changeInputValues(minCount, maxCount, minYear, maxYear);
    this.filterArr = this.data.filter(
      (elem) =>
        +elem.year >= +minYear &&
        +elem.year <= +maxYear &&
        +elem.count >= +minCount &&
        +elem.count <= +maxCount
    );
    if (!otherFilters.isFilterClear()) {
      this.filterArr = this.filterArr.filter((elem) => {
        return otherFilters.hasActiveFilters(elem);
      });
    }
    this.renderCards(this.filterArr);
  }

  setData() {
    const saveData = dataDecor.load();
    console.log(saveData);

    if (saveData) {
      otherFilters.keysColor = saveData.keysColor;
      otherFilters.keysSize = saveData.keysSize;
      otherFilters.keysShape = saveData.keysShape;
      otherFilters.favoriteObj.num = [...saveData.favoriteObj.num];
      otherFilters.favoriteObj.count = [...saveData.favoriteObj.count];

      if (saveData.keyOptionSelect !== 0) {
        this.filterArr = sortSelect.sortData(
          this.data,
          saveData.keyOptionSelect
        );
      }
      (
        buttonsDecor.favoriteCountSpan as HTMLElement
      ).textContent = `${otherFilters.favoriteObj.num.length}`;

      buttonsDecor.loadTargetButtons();
      const [minYear, maxYear] = saveData.keysYear;
      const [minCount, maxCount] = saveData.keysCount;
      otherFilters.loadRangeSlider(minCount, maxCount, minYear, maxYear);
      (buttonsDecor.favorite as HTMLInputElement).checked =
        saveData.showFavorite;
    }
  }
}

export const app = new Application();

export default Application;
