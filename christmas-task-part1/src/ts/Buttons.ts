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
  }
}

export let buttons = new Buttons();



