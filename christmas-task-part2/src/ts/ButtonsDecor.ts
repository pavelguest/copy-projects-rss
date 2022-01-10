import { app } from './Application';
import { otherFilters } from './OtherFilters';
import { dataDecor } from './DataStorageDecor';

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
    this.favoriteCountSpan = document.querySelector(
      '.header-buttons__count span'
    );
    this.defaultSettings = document.querySelector('.apply-buttons__default');
    this.resetLocal = document.querySelector('.apply-buttons__reset-local');
    this.searchInput = document.querySelector('.search__input');
    this.searchCancel = document.querySelector('.search__cancel-ico');
    this.search = document.querySelector('.header-buttons__search');
    this.favoriteCount = document.querySelector('.header-buttons__count');
  }

  changeInputValues(
    minCount: string,
    maxCount: string,
    minYear: string,
    maxYear: string
  ): void {
    (this.inputCountMin as HTMLOutputElement).textContent = `${Math.round(
      +minCount
    )}`;
    (this.inputCountMax as HTMLOutputElement).textContent = `${Math.round(
      +maxCount
    )}`;
    (this.inputYearMin as HTMLOutputElement).textContent = `${Math.round(
      +minYear
    )}`;
    (this.inputYearMax as HTMLOutputElement).textContent = `${Math.round(
      +maxYear
    )}`;
  }

  changeFavoriteSpanValue(arrLength: string[]): void {
    if (this.favoriteCountSpan)
      this.favoriteCountSpan.textContent = `${arrLength.length}`;
  }

  createAlertWindow(): void {
    const alertWindow = document.createElement('div');
    alertWindow.classList.add('alert-window');
    alertWindow.textContent = 'Извините, все слоты заполнены';
    app.container.append(alertWindow);
    setTimeout(() => {
      alertWindow.remove();
    }, 1000);
  }

  cancelTargetButtons(): void {
    document
      .querySelectorAll('.color button, .size button, .shape button')
      .forEach((button) => {
        button.classList.remove('active');
      });
    if (this.favorite instanceof HTMLInputElement) {
      this.favorite.checked = false;
      dataDecor.showFavorite = false;
    }
  }

  loadTargetButtons(): void {
    document
      .querySelectorAll('.color button, .size button, .shape button')
      .forEach((button) => {
        if (button instanceof HTMLElement) {
          if (otherFilters.keysColor.includes(button.dataset.filter as string))
            button.classList.add('active');
          if (otherFilters.keysSize.includes(button.dataset.filter as string))
            button.classList.add('active');
          if (otherFilters.keysShape.includes(button.dataset.filter as string))
            button.classList.add('active');
        }
      });
  }
}

export const buttonsDecor = new ButtonsDecor();
