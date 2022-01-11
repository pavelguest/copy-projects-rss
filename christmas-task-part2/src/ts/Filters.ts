import { app } from './Application';
import { buttonsDecor } from './ButtonsDecor';
import { dataDecor } from './DataStorageDecor';
import { Idata, IobjKeys } from './interface';
import { slider } from './slider';

class Filters {
  objKeys: IobjKeys;

  constructor() {
    this.objKeys = {
      keysColor: [],
      keysSize: [],
      keysShape: [],
      keysYear: [],
      keysCount: [],
      favoriteDecorObj: {
        num: [],
        count: [],
      },
    };
  }

  deleteKey(keys: string[], key: string): void {
    const deleteIndex = keys.indexOf(key);
    if (deleteIndex > -1) keys.splice(deleteIndex, 1);
  }

  isFilterClear(): boolean {
    return (
      !this.objKeys.keysColor.length &&
      !this.objKeys.keysShape.length &&
      !this.objKeys.keysSize.length &&
      !(buttonsDecor.favorite as HTMLInputElement).checked
    );
  }

  setFavoriteCards(num: string, count: string): void {
    if (
      this.objKeys.favoriteDecorObj.num.includes(num) &&
      this.objKeys.favoriteDecorObj.count.includes(count)
    ) {
      this.deleteKey(this.objKeys.favoriteDecorObj.num, num);
      this.deleteKey(this.objKeys.favoriteDecorObj.count, count);
    } else {
      this.objKeys.favoriteDecorObj.num.push(num);
      this.objKeys.favoriteDecorObj.count.push(count);
    }
    if (dataDecor.storage)
      dataDecor.storage.favoriteDecorObj = {
        num: [...this.objKeys.favoriteDecorObj.num],
        count: [...this.objKeys.favoriteDecorObj.count],
      };
    dataDecor.save();
  }

  getActiveClassForCards(num: Idata): string {
    return this.objKeys.favoriteDecorObj.num.length &&
      this.objKeys.favoriteDecorObj.num.includes(num.num)
      ? 'active'
      : '';
  }

  clearKeysFiltration(): void {
    this.objKeys.keysColor = [];
    this.objKeys.keysSize = [];
    this.objKeys.keysShape = [];
    if (dataDecor.storage) {
      dataDecor.storage.keysColor = [];
      dataDecor.storage.keysShape = [];
      dataDecor.storage.keysSize = [];
    }
    slider.defaultRange();
    buttonsDecor.sortData(app.data, dataDecor.storage!.keyOptionSelect);
  }
  hasKeysColor(value: string | undefined): void {
    if (value) {
      if (this.objKeys.keysColor.includes(value)) {
        this.deleteKey(this.objKeys.keysColor, value);
      } else {
        this.objKeys.keysColor.push(value);
      }
      if (dataDecor.storage)
        dataDecor.storage.keysColor = [...this.objKeys.keysColor];
      dataDecor.save();
    }
  }

  hasKeysSize(value: string | undefined): void {
    if (value) {
      if (this.objKeys.keysSize.includes(value)) {
        this.deleteKey(this.objKeys.keysSize, value);
      } else {
        this.objKeys.keysSize.push(value);
      }
      if (dataDecor.storage)
        dataDecor.storage.keysSize = [...this.objKeys.keysSize];
      dataDecor.save();
    }
  }

  hasKeysShape(value: string | undefined): void {
    if (value) {
      if (this.objKeys.keysShape.includes(value)) {
        this.deleteKey(this.objKeys.keysShape, value);
      } else {
        this.objKeys.keysShape.push(value);
      }
      if (dataDecor.storage)
        dataDecor.storage.keysShape = [...this.objKeys.keysShape];
      dataDecor.save();
    }
  }

  hasKeysYear(minYear: string, maxYear: string): void {
    this.objKeys.keysYear = [minYear, maxYear];
  }

  hasKeysCount(minCount: string, maxCount: string): void {
    this.objKeys.keysCount = [minCount, maxCount];
  }
  hasActiveFilters(data: Idata): boolean | undefined {
    return (
      this.filterColor(data.color) &&
      this.filterSize(data.size) &&
      this.filterShape(data.shape) &&
      this.filterFavorite(data.favorite)
    );
  }

  filterColor(color: string): boolean {
    return this.objKeys.keysColor.length > 0
      ? this.objKeys.keysColor.includes(color)
      : true;
  }

  filterSize(size: string): boolean {
    return this.objKeys.keysSize.length > 0
      ? this.objKeys.keysSize.includes(size)
      : true;
  }

  filterShape(shape: string): boolean {
    return this.objKeys.keysShape.length > 0
      ? this.objKeys.keysShape.includes(shape)
      : true;
  }

  filterFavorite(favorite: boolean): boolean | undefined {
    if (buttonsDecor.favorite) {
      return (buttonsDecor.favorite as HTMLInputElement).checked
        ? favorite === true
        : true;
    }
  }
}

export const filters = new Filters();

export default Filters;
