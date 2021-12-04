import './sources.css';

export interface ISources {
  id: string
  name: string
}
class Sources {
    draw(data: ISources[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            let itemName = sourceClone.querySelector('.source__item-name');
            let itemId = sourceClone.querySelector('.source__item');

            if(itemName === null || itemId === null) return;

            itemName.textContent = item.name;
            itemId.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
