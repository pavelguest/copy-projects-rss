import { pages } from "./Pages";

class RenderDecor {
  render(num: string, count: string) {
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('decor__img-container');
    imgContainer.id = num;

    let countSpan = document.createElement('span');
    countSpan.classList.add('decor__count');
    countSpan.textContent = count;

    pages.decorContainer!.append(imgContainer);
    imgContainer.append(countSpan);

    for (let index = 0; index < +count; index++) {
      let img = document.createElement('img');
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
