import { Idata } from './CreateElement';
import data from './data';
import { renderDecor } from './RenderDecor';
import { saveLocal } from './SaveFiltersDecor';

class FilterDecor {
  data: Idata[];

  constructor() {
    this.data = [ ...data ];
  }

  filter() {
    if (saveLocal.favoriteObj.num.length) {
      saveLocal.favoriteObj.num.forEach((elem, index) => {
        const count = saveLocal.favoriteObj.count[index];
        renderDecor.render(elem, count);
      });
    } else {
      this.data.forEach((elem, index) => {
        if (index <= 19) renderDecor.render(elem.num, elem.count);
      });
    }
  }
}

export const filterDecor = new FilterDecor();

