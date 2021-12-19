import { createElement } from "./CreateElement";
import { rangeCount, rangeYear } from "./slider";

class Buttons {
  color: HTMLElement | null;
  size: HTMLElement| null;
  shape: HTMLElement| null;
  favorite: HTMLElement | null;
  select: HTMLSelectElement | null;
  rangeYear: any;
  rangeCount: any;
  inputYearMin: HTMLOutputElement |null;
  inputYearMax: HTMLOutputElement |null;
  inputCountMin: HTMLOutputElement |null;
  inputCountMax: HTMLOutputElement |null;
  favoriteCountSpan: HTMLElement | null;
  defaultSettings: HTMLElement | null;
  searchInput: HTMLInputElement | null;
  searchCancel: HTMLElement | null;

  constructor() {
    this.color = document.querySelector('.color');
    this.size = document.querySelector('.size');
    this.shape = document.querySelector('.shape');
    this.favorite = document.getElementById('favorite');
    this.select = document.querySelector('.sort-select');
    this.rangeYear = rangeYear.noUiSlider;
    this.rangeCount = rangeCount.noUiSlider;
    this.inputYearMin = document.querySelector('.year-min');
    this.inputYearMax = document.querySelector('.year-max');
    this.inputCountMin = document.querySelector('.count-min');
    this.inputCountMax = document.querySelector('.count-max');
    this.favoriteCountSpan = document.querySelector('.header-buttons__count span');
    this.defaultSettings = document.querySelector('.apply-buttons__default');
    this.searchInput = document.querySelector('.search__input');
    this.searchCancel = document.querySelector('.search__cancel-ico');
    this.searchInput!.focus();
  }
  changeInputValues(minCount: string, maxCount: string, minYear: string, maxYear: string) {
    this.inputCountMin!.textContent = ((+minCount * 100) / 100).toString();
    this.inputCountMax!.textContent = ((+maxCount * 100) / 100).toString();
    this.inputYearMin!.textContent = ((+minYear * 100) / 100).toString();
    this.inputYearMax!.textContent = ((+maxYear * 100) / 100).toString();
  }
  changeFavoriteSpanValue(arrLength: string[]) {
    this.favoriteCountSpan!.textContent = `${arrLength.length}`;
  }
  createAlertWindow() {
    let alertWindow = document.createElement('div');
    alertWindow.classList.add('alert-window');
    alertWindow.textContent = `Извините, все слоты заполнены`;
    createElement.container.append(alertWindow);
    setTimeout(() => {
      alertWindow.remove();
    }, 1000);
  }
  cancelTargetButtons() {
    document.querySelectorAll('.color button, .size button, .shape button').forEach(button => {
      button.classList.remove('active')
    })
    if(this.favorite instanceof HTMLInputElement) {
      this.favorite.checked = false;
    }
  }
}

export let buttons = new Buttons();



