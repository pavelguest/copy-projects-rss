import { app } from './CreateElement';
import { otherFilters } from './OtherFilters';
import { saveLocal } from './SaveFiltersDecor';

class ButtonsDecor {
  color: HTMLElement | null;

  size: HTMLElement | null;

  shape: HTMLElement | null;

  favorite: HTMLElement | null;

  select: HTMLSelectElement | null;

  inputYearMin: HTMLOutputElement | null;

  inputYearMax: HTMLOutputElement | null;

  inputCountMin: HTMLOutputElement | null;

  inputCountMax: HTMLOutputElement | null;

  favoriteCountSpan: HTMLElement | null;

  defaultSettings: HTMLElement | null;

  resetLocal: HTMLElement | null;

  searchInput: HTMLInputElement | null;

  searchCancel: HTMLElement | null;

  search: HTMLElement | null;

  favoriteCount: HTMLElement | null;



  constructor() {
    this.color = document.querySelector('.color');
    this.size = document.querySelector('.size');
    this.shape = document.querySelector('.shape');
    this.favorite = document.getElementById('favorite');
    this.select = document.querySelector('.sort-select');

    this.inputYearMin = document.querySelector('.year-min');
    this.inputYearMax = document.querySelector('.year-max');
    this.inputCountMin = document.querySelector('.count-min');
    this.inputCountMax = document.querySelector('.count-max');
    this.favoriteCountSpan = document.querySelector('.header-buttons__count span');
    this.defaultSettings = document.querySelector('.apply-buttons__default');
    this.resetLocal = document.querySelector('.apply-buttons__reset-local');
    this.searchInput = document.querySelector('.search__input');
    this.searchCancel = document.querySelector('.search__cancel-ico');
    this.search = document.querySelector('.header-buttons__search');
    this.favoriteCount = document.querySelector('.header-buttons__count');
  }

  changeInputValues(minCount: string, maxCount: string, minYear: string, maxYear: string) {
    (this.inputCountMin as HTMLOutputElement).textContent = ((+minCount * 100) / 100).toString();
    (this.inputCountMax as HTMLOutputElement).textContent = ((+maxCount * 100) / 100).toString();
    (this.inputYearMin as HTMLOutputElement).textContent = ((+minYear * 100) / 100).toString();
    (this.inputYearMax as HTMLOutputElement).textContent = ((+maxYear * 100) / 100).toString();
  }

  changeFavoriteSpanValue(arrLength: string[]) {
    (this.favoriteCountSpan as HTMLElement).textContent = `${arrLength.length}`;
  }

  createAlertWindow() {
    const alertWindow = document.createElement('div');
    alertWindow.classList.add('alert-window');
    alertWindow.textContent = 'Извините, все слоты заполнены';
    app.container.append(alertWindow);
    setTimeout(() => {
      alertWindow.remove();
    }, 1000);
  }

  cancelTargetButtons() {
    document.querySelectorAll('.color button, .size button, .shape button').forEach(button => {
      button.classList.remove('active');
    });
    if (this.favorite instanceof HTMLInputElement) {
      this.favorite.checked = false;
      saveLocal.isFavorite = false;
    }
  }

  loadTargetButtons() {
    document.querySelectorAll('.color button, .size button, .shape button').forEach(button => {
      if (button instanceof HTMLElement) {
        if (otherFilters.keysColor.includes(button.dataset.filter as string)) button.classList.add('active');
        if (otherFilters.keysSize.includes(button.dataset.filter as string)) button.classList.add('active');
        if (otherFilters.keysShape.includes(button.dataset.filter as string)) button.classList.add('active');
      }
    });
  }
}

export const buttonsDecor = new ButtonsDecor();



