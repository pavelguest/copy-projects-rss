import { buttons } from './Buttons';
import { Idata } from './CreateElement';

class Sort {
  sortData(data: Idata[], indexOption: number | null) {
    if (indexOption) {
      const value = (buttons.select as HTMLSelectElement).options[indexOption].value;
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
