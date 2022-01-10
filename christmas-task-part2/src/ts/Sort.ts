import { buttonsDecor } from './ButtonsDecor';
import { Idata } from './Application';

class Sort {
  sortData(data: Idata[], indexOption: number | null): Idata[] {
    if (indexOption) {
      const value =
        buttonsDecor.select && buttonsDecor.select.options[indexOption].value;
      if (value === 'sort-count__max') {
        data.sort((a, b) => +a.count - +b.count);
      } else if (value === 'sort-count__min') {
        data.sort((a, b) => +b.count - +a.count);
      } else if (value === 'sort-name__max') {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if (value === 'sort-name__min') {
        data.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    return data;
  }
}

export const sortSelect = new Sort();
