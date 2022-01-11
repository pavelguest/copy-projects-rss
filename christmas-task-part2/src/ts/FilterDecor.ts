import data from './data';
import { renderDecor } from './RenderDecor';
import { dataDecor } from './DataStorageDecor';
import { Idata } from './interface';

class FilterDecor {
  data: Idata[];

  constructor() {
    this.data = [...data];
  }

  filter(): void {
    if (dataDecor.storage)
      if (dataDecor.storage.favoriteDecorObj.num.length) {
        dataDecor.storage.favoriteDecorObj.num.forEach((elem, index) => {
          const count = dataDecor.storage!.favoriteDecorObj.count[index];
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
