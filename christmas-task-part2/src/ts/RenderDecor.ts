import { pages } from './Pages';

class RenderDecor {
  render(num: string, count: string) {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('decor__img-container');
    imgContainer.id = num;

    const countSpan = document.createElement('span');
    countSpan.classList.add('decor__count');
    countSpan.textContent = count;

    (pages.decorContainer as HTMLElement).append(imgContainer);
    imgContainer.append(countSpan);

    for (let index = 0; index < +count; index++) {
      const img = document.createElement('img');
      img.classList.add('decor__img');
      img.src = `./assets/toys/${num}.png`;
      img.alt = 'decoration';
      img.draggable = true;
      img.dataset.img = num;
      imgContainer.append(img);
    }
  }
}

export const renderDecor = new RenderDecor();
