import Filters from './Filters';
import { dataDecor } from './DataStorageDecor';
import { Idata } from './Application';
import { buttonsDecor } from './ButtonsDecor';

class OtherFilters extends Filters {
  hasKeysColor(value: string | undefined): void {
    if (value) {
      if (this.keysColor.includes(value)) {
        this.deleteKey(this.keysColor, value);
      } else {
        this.keysColor.push(value);
      }
      dataDecor.keysColor = [...this.keysColor];
      dataDecor.save();
    }
  }

  hasKeysSize(value: string | undefined): void {
    if (value) {
      if (this.keysSize.includes(value)) {
        this.deleteKey(this.keysSize, value);
      } else {
        this.keysSize.push(value);
      }
      dataDecor.keysSize = [...this.keysSize];
      dataDecor.save();
    }
  }

  hasKeysShape(value: string | undefined): void {
    if (value) {
      if (this.keysShape.includes(value)) {
        this.deleteKey(this.keysShape, value);
      } else {
        this.keysShape.push(value);
      }
      dataDecor.keysShape = [...this.keysShape];
      dataDecor.save();
    }
  }

  hasKeysYear(minYear: string, maxYear: string): void {
    this.keysYear = [minYear, maxYear];
  }

  hasKeysCount(minCount: string, maxCount: string): void {
    this.keysCount = [minCount, maxCount];
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
    return this.keysColor.length > 0 ? this.keysColor.includes(color) : true;
  }

  filterSize(size: string): boolean {
    return this.keysSize.length > 0 ? this.keysSize.includes(size) : true;
  }

  filterShape(shape: string): boolean {
    return this.keysShape.length > 0 ? this.keysShape.includes(shape) : true;
  }

  filterFavorite(favorite: boolean): boolean | undefined {
    if (buttonsDecor.favorite) {
      return (buttonsDecor.favorite as HTMLInputElement).checked
        ? favorite === true
        : true;
    }
  }
}

export const otherFilters = new OtherFilters();

export default OtherFilters;
