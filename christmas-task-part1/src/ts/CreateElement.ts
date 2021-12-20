import { API, target } from "nouislider";
import { buttons } from "./Buttons";
import data from "./data";
import { otherFilters } from "./OtherFilters";
import { saveLocal } from "./SaveLocalStorage";
import { rangeCount, rangeYear } from "./slider";
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

  renderCards(data: Idata[]) {
    this.container.innerHTML = '';
    if(!data.length) this.container.insertAdjacentHTML('beforeend', `<h3 class="error__subtitle">Извините, совпадений не обнаружено</h3>`)
    data.forEach(e => {
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
      console.log(event.target);
      saveLocal.isFavorite = (event.target as HTMLInputElement).checked;
      saveLocal.save()
      this.filtration();
        }
    buttons.select!.onchange = (event) => {
      if(event.target instanceof HTMLSelectElement) {
        let sortData = sortSelect.sortData(this.filterArr, event.target.options.selectedIndex);
        this.renderCards(sortData);
        saveLocal.keyOptionSelect = event.target.selectedIndex;
        saveLocal.save();
      }
    };
    (<API>rangeYear.noUiSlider).on('update', (values: (string | number)[]) => {
      let [ minYear, maxYear ] = values;
      saveLocal.keysYear = [ (minYear as string), (maxYear as string) ]
      saveLocal.save();
      otherFilters.hasKeysYear(minYear, maxYear);
      this.filtration()
    });
    (<API>rangeCount.noUiSlider).on('update', (values: (string | number)[]) => {
      let [ minCount, maxCount ] = values;
      saveLocal.keysCount = [ (minCount as string), (maxCount as string) ]
      saveLocal.save();
      otherFilters.hasKeysCount(minCount, maxCount);
      this.filtration()
    })
    buttons.defaultSettings!.onclick = (event) => {
      if(event.target instanceof HTMLElement) {
        otherFilters.clearKeysFiltration();
        buttons.cancelTargetButtons();
        buttons.searchInput!.value = '';
        saveLocal.keyOptionSelect = 0;
        saveLocal.save();
        this.filtration();
      }
    }
    buttons.searchInput!.oninput = (event) => {
      if(event.target instanceof HTMLInputElement) {
        let pattern = event.target.value.split(" ").map((elem) => {
          return `(.*${elem})`
        }).join('');
        let regex = new RegExp(`${pattern}`, "gi")
        this.searchArr = this.filterArr.filter(card => card.name.match(regex))
        this.renderCards(this.searchArr);
      }
    }
    buttons.searchCancel!.onclick = (event) => {
      buttons.searchInput!.value = '';
      this.filtration();
    }
    buttons.resetLocal!.onclick = (event) => {
      saveLocal.default();
      saveLocal.save();
    }
  }
  addListenerForCards() {
    document.querySelectorAll('.cards__item').forEach((card, index) => {
      let cardNum = this.filterArr[index];
      console.log(index);

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
  setData() {
    let saveData = saveLocal.load();
    console.log(saveLocal)
    if(saveData) {
      otherFilters.keysColor = saveData.keysColor;
      otherFilters.keysSize = saveData.keysSize;
      otherFilters.keysShape = saveData.keysShape;
      otherFilters.favoriteArr = saveData.favoriteArr;
      if(saveData.keyOptionSelect !== 0) {
        this.filterArr = sortSelect.sortData(this.data, saveData.keyOptionSelect);
      }
      buttons.favoriteCountSpan!.textContent = `${otherFilters.favoriteArr.length}`;

      buttons.loadTargetButtons();
      let [minYear, maxYear] = saveData.keysYear;
      let [minCount, maxCount] = saveData.keysCount;
      otherFilters.loadRangeSlider(minCount, maxCount, minYear, maxYear);
      (otherFilters.input as HTMLInputElement).checked = saveData.isFavorite;
    }
  }
}

export const app = new Application();

app.setData();
app.filtration();
app.addListenerForButtons();




export default Application;
