import { createElement, Idata } from "./CreateElement";
import Filters from "./Filters";

class OtherFilters extends Filters {
  constructor() {
    super()
  }
  hasKeysColor(button: HTMLElement | null) {
    if(button) (this.isKeys(this.keysColor, button.dataset.filter!))
             ? this.deleteKey(this.keysColor, button.dataset.filter!)
             : this.addKey(this.keysColor, button.dataset.filter!);
  }
  hasKeysSize(button: HTMLElement | null) {
    if(button) (this.isKeys(this.keysSize, button.dataset.filter!))
             ? this.deleteKey(this.keysSize, button.dataset.filter!)
             : this.addKey(this.keysSize, button.dataset.filter!);
  }
  hasKeysShape(button: HTMLElement | null) {
    if(button) (this.isKeys(this.keysShape, button.dataset.filter!))
             ? this.deleteKey(this.keysShape, button.dataset.filter!)
             : this.addKey(this.keysShape, button.dataset.filter!);
  }
  hasKeysYear(values: string[]) {
    this.keysYear = [ ...values ];
  }
  hasKeysCount(values: string[]) {
    this.keysCount = [ ...values ];
  }
  filterColor(elem: { color: string; }) {
    return (this.keysColor.length > 0) ? this.keysColor.includes(elem!.color) : true;
  }
  filterSize(elem: { size: string; }) {
    return (this.keysSize.length > 0) ? this.keysSize.includes(elem!.size) : true;
  }
  filterShape(elem: { shape: string; }) {
    return (this.keysShape.length > 0) ? this.keysShape.includes(elem!.shape) : true;
  }
  filterFavorite(elem: { favorite: boolean }) {
    if(this.input) {
      return((this.input as HTMLInputElement).checked) ? elem.favorite === true : true;
    }
  }
}

export let otherFilters = new OtherFilters()
