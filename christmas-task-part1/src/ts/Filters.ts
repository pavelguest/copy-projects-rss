class Filters {
  keysColor: string[];
  keysSize: string[];
  keysShape: string[];
  keysYear: string[];
  keysCount: string[];
  input: HTMLElement | null;

  constructor() {
    this.keysColor = [];
    this.keysSize = [];
    this.keysShape = [];
    this.keysYear = [];
    this.keysCount = [];
    this.input = document.getElementById('favorite');
  }

  isKeys(keys: string[], key: string) {
    return keys.length ? keys.includes(key) : false;
  }
  addKey(keys: string[], key: string) {
    keys.push(key)
  }
  deleteKey(keys: string[], key: string) {
    let deleteIndex = keys.indexOf(key);
    if (deleteIndex > -1) keys.splice(deleteIndex, 1);
  }
  isFilterClear() {
    return !this.keysColor.length
        && !this.keysShape.length
        && !this.keysSize.length
        && !(this.input as HTMLInputElement).checked
  }
}

export default Filters
