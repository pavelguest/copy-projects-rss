import Filters from './Filters';
import { saveLocal } from './SaveFiltersDecor';

class OtherFilters extends Filters {
  hasKeysColor(button: HTMLElement | null) {
    if (button) {
      if (this.isKeys(this.keysColor, (button.dataset.filter as string))) {
        this.deleteKey(this.keysColor, (button.dataset.filter as string));
      } else {
        this.addKey(this.keysColor, (button.dataset.filter as string));
      }
      saveLocal.keysColor = [ ...this.keysColor ];
      saveLocal.save();
    }
  }

  hasKeysSize(button: HTMLElement | null) {
    if (button) {
      if (this.isKeys(this.keysSize, (button.dataset.filter as string))) {
        this.deleteKey(this.keysSize, (button.dataset.filter as string));
      } else {
        this.addKey(this.keysSize, (button.dataset.filter as string));
      }
      saveLocal.keysSize = [ ...this.keysSize ];
      saveLocal.save();
    }
  }

  hasKeysShape(button: HTMLElement | null) {
    if (button) {
      if (this.isKeys(this.keysShape, (button.dataset.filter as string))) {
        this.deleteKey(this.keysShape, (button.dataset.filter as string));
      } else {
        this.addKey(this.keysShape, (button.dataset.filter as string));
      }
      saveLocal.keysShape = [ ...this.keysShape ];
      saveLocal.save();
    }
  }

  hasKeysYear(minYear: string | number, maxYear:string | number) {
    this.keysYear = [(minYear as string), (maxYear as string)];
  }

  hasKeysCount(minCount:string | number, maxCount:string | number) {
    this.keysCount = [(minCount as string), (maxCount as string)];
  }

  filterColor(elem: { color: string; }) {
    return (this.keysColor.length > 0) ? this.keysColor.includes(elem.color) : true;
  }

  filterSize(elem: { size: string; }) {
    return (this.keysSize.length > 0) ? this.keysSize.includes(elem.size) : true;
  }

  filterShape(elem: { shape: string; }) {
    return (this.keysShape.length > 0) ? this.keysShape.includes(elem.shape) : true;
  }

  filterFavorite(elem: { favorite: boolean }) {
    if (this.input) {
      return ((this.input as HTMLInputElement).checked) ? elem.favorite === true : true;
    }
  }
}

export const otherFilters = new OtherFilters();

export default OtherFilters;
