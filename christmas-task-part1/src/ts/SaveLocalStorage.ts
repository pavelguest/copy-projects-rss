import { app } from "./CreateElement";
import { otherFilters } from "./OtherFilters";

class SaveLocal {
  keysColor: string[];
  keysSize: string[];
  keysShape: string[];
  keysYear: string[];
  keysCount: string[];
  favoriteArr: string[];
  isFavorite: boolean;
  keyOptionSelect: number;

  constructor() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    this.keysYear = [];
    this.keysCount = [];
    this.favoriteArr = [];
    this.isFavorite = false;
    this.keyOptionSelect = 0;
  }
  save() {
    localStorage.setItem('options', JSON.stringify(this));
    console.log(`ss`);

  }
  load() {
    if (localStorage.getItem('options')) {
      const options = JSON.parse(localStorage.getItem('options') || "{}");
      this.keysColor = options.keysColor;
      this.keysSize = options.keysSize;
      this.keysShape = options.keysShape;
      this.keysYear = options.keysYear;
      this.keysCount = options.keysCount;
      this.favoriteArr = options.favoriteArr;
      this.isFavorite = options.isFavorite;
      this.keyOptionSelect = options.keyOptionSelect;

      return options

    }
  }
}

export let saveLocal = new SaveLocal;

export default SaveLocal;

