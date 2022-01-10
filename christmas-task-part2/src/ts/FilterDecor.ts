import { Idata } from './Application';
import data from './data';
import { renderDecor } from './RenderDecor';
import { dataDecor } from './DataStorageDecor';

class FilterDecor {
  data: Idata[];

  constructor() {
    this.data = [...data];
  }

  filter(): void {
    if (dataDecor.favoriteObj.num.length) {
      dataDecor.favoriteObj.num.forEach((elem, index) => {
        const count = dataDecor.favoriteObj.count[index];
        renderDecor.render(elem, count);
      });
    } else {
      this.data.slice(0, 20).forEach((elem) => {
        renderDecor.render(elem.num, elem.count);
      });
    }
  }
}

export const filterDecor = new FilterDecor();
