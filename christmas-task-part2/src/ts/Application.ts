import { API } from 'nouislider';
import { buttonsDecor } from './ButtonsDecor';
import data from './data';
import { dataDecor } from './DataStorageDecor';
import { slider } from './slider';
import { Idata } from './interface';
import { filters } from './Filters';

class Application {
  container: HTMLElement;

  data: Idata[];

  dataForRender: [] | Idata[];

  searchArr: Idata[];

  constructor() {
    this.container = document.querySelector('.cards') as HTMLElement;
    this.data = [...data];
    this.dataForRender = [...data];
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
      <div class="cards__item ${filters.getActiveClassForCards(e)}">
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
        filters.hasKeysColor(event.target.dataset.filter);
        this.filtration();
      }
    };
    if (buttonsDecor.size)
      buttonsDecor.size.onclick = (event) => {
        if (
          event.target instanceof HTMLElement &&
          event.target !== event.currentTarget
        ) {
          event.target.classList.toggle('active');
          filters.hasKeysSize(event.target.dataset.filter);
          this.filtration();
        }
      };
    if (buttonsDecor.shape)
      buttonsDecor.shape.onclick = (event) => {
        if (
          event.target instanceof HTMLElement &&
          event.target !== event.currentTarget
        ) {
          event.target.classList.toggle('active');
          filters.hasKeysShape(event.target.dataset.filter);
          this.filtration();
        }
      };
    if (buttonsDecor.favorite)
      buttonsDecor.favorite.onclick = (event) => {
        if (dataDecor.storage)
          dataDecor.storage.showFavorite = (
            event.target as HTMLInputElement
          ).checked;
        dataDecor.save();
        this.filtration();
      };
    if (buttonsDecor.select)
      buttonsDecor.select.onchange = (event) => {
        if (event.target instanceof HTMLSelectElement) {
          this.dataForRender = buttonsDecor.sortData(
            this.dataForRender,
            event.target.options.selectedIndex
          );
          this.renderCards(this.dataForRender);
          if (dataDecor.storage)
            dataDecor.storage.keyOptionSelect = event.target.selectedIndex;
          dataDecor.save();
        }
      };
    (<API>slider.rangeYear.noUiSlider).on(
      'update',
      (values: (string | number)[]) => {
        const [minYear, maxYear] = values;
        if (dataDecor.storage)
          dataDecor.storage.keysYear = [minYear as string, maxYear as string];
        dataDecor.save();
        filters.hasKeysYear(minYear.toString(), maxYear.toString());
        this.filtration();
      }
    );
    (<API>slider.rangeCount.noUiSlider).on(
      'update',
      (values: (string | number)[]) => {
        const [minCount, maxCount] = values;
        if (dataDecor.storage)
          dataDecor.storage.keysCount = [
            minCount as string,
            maxCount as string,
          ];
        dataDecor.save();
        filters.hasKeysCount(minCount.toString(), maxCount.toString());
        this.filtration();
      }
    );
    if (buttonsDecor.defaultSettings)
      buttonsDecor.defaultSettings.onclick = (event) => {
        if (event.target instanceof HTMLElement) {
          filters.clearKeysFiltration();
          buttonsDecor.cancelTargetButtons();
          (buttonsDecor.searchInput as HTMLInputElement).value = '';
          if (dataDecor.storage) dataDecor.storage.keyOptionSelect = 0;
          dataDecor.save();
          this.filtration();
        }
      };
    if (buttonsDecor.searchInput)
      buttonsDecor.searchInput.oninput = (event) => {
        if (event.target instanceof HTMLInputElement) {
          const pattern = event.target.value
            .split(' ')
            .map((elem) => {
              return `(.*${elem})`;
            })
            .join('');
          const regex = new RegExp(`${pattern}`, 'gi');
          this.searchArr = this.dataForRender.filter((card) =>
            card.name.match(regex)
          );
          this.renderCards(this.searchArr);
        }
      };
    if (buttonsDecor.searchCancel)
      buttonsDecor.searchCancel.onclick = () => {
        (buttonsDecor.searchInput as HTMLInputElement).value = '';
        this.filtration();
      };
    if (buttonsDecor.resetLocal)
      buttonsDecor.resetLocal.onclick = () => {
        dataDecor.default();
        slider.defaultRange();
        dataDecor.save();
      };
    buttonsDecor.searchInput?.focus();
  }

  addListenerForCards(): void {
    document.querySelectorAll('.cards__item').forEach((card, index) => {
      const cardNum = this.dataForRender[index];

      card.addEventListener('click', () => {
        if (
          filters.objKeys.favoriteDecorObj.num.length <= 19 &&
          filters.objKeys.favoriteDecorObj.count.length <= 19
        ) {
          filters.setFavoriteCards(cardNum.num, cardNum.count);
          card.classList.toggle('active');
        } else {
          card.classList.remove('active');
          filters.deleteKey(filters.objKeys.favoriteDecorObj.num, cardNum.num);
          filters.deleteKey(
            filters.objKeys.favoriteDecorObj.count,
            cardNum.count
          );
          if (filters.objKeys.favoriteDecorObj.num.length > 19) {
            buttonsDecor.createAlertWindow();
          }
        }
        buttonsDecor.changeFavoriteSpanValue(
          filters.objKeys.favoriteDecorObj.num
        );
      });
    });
  }

  filtration(): void {
    const [minYear, maxYear] = filters.objKeys.keysYear;
    const [minCount, maxCount] = filters.objKeys.keysCount;
    buttonsDecor.changeInputValues(minCount, maxCount, minYear, maxYear);
    this.dataForRender = this.data.filter(
      (elem) =>
        +elem.year >= +minYear &&
        +elem.year <= +maxYear &&
        +elem.count >= +minCount &&
        +elem.count <= +maxCount
    );
    if (!filters.isFilterClear()) {
      this.dataForRender = this.dataForRender.filter((elem) => {
        return filters.hasActiveFilters(elem);
      });
    }
    this.renderCards(this.dataForRender);
  }

  setData() {
    const saveData = dataDecor.load();

    if (saveData) {
      filters.objKeys.keysColor = saveData.keysColor;
      filters.objKeys.keysSize = saveData.keysSize;
      filters.objKeys.keysShape = saveData.keysShape;
      filters.objKeys.favoriteDecorObj.num = [...saveData.favoriteDecorObj.num];
      filters.objKeys.favoriteDecorObj.count = [
        ...saveData.favoriteDecorObj.count,
      ];

      if (saveData.keyOptionSelect !== 0) {
        this.dataForRender = buttonsDecor.sortData(
          this.data,
          saveData.keyOptionSelect
        );
      }
      if (buttonsDecor.favoriteCountSpan)
        buttonsDecor.favoriteCountSpan.textContent = `${filters.objKeys.favoriteDecorObj.num.length}`;
      buttonsDecor.loadTargetButtons();
      const [minYear, maxYear] = saveData.keysYear;
      const [minCount, maxCount] = saveData.keysCount;
      slider.loadRangeSlider(minCount, maxCount, minYear, maxYear);
      if (buttonsDecor.favorite instanceof HTMLInputElement)
        buttonsDecor.favorite.checked = saveData.showFavorite;
    }
  }
}

export const app = new Application();

export default Application;
