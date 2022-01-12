import { ISources } from 'components/types/types';
import './sources.css';

class Sources {
  draw(data: ISources[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const itemName = sourceClone.querySelector('.source__item-name');
      const itemId = sourceClone.querySelector('.source__item');
      itemId?.classList.add('swiper-slide');

      if (itemName === null || itemId === null) return;

      itemName.textContent = item.name;
      itemId.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
import './swiper';
