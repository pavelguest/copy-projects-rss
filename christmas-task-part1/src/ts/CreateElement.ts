import data from "./data";

export interface Idata {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}
class CreateElement {
  container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.cards') as HTMLElement;
  }

  renderCards(data: Idata[]) {
    this.container.innerHTML = '';
    data.forEach(e => {
      this.container.insertAdjacentHTML('beforeend', `
        <div class="cards__item">
          <h3 class="cards__subtitle">${e.name}</h3>
          <img class="cards__img" src="../assets/toys/${e.num}.png" alt="decoration">
          <div class="cards__text-container">
            <p class="cards__text">Количество: ${e.count}</p>
            <p class="cards__text">Год покупки: ${e.year}</p>
            <p class="cards__text">Форма: ${e.shape}</p>
            <p class="cards__text">Цвет: ${e.color}</p>
            <p class="cards__text">Размер: ${e.size}</p>
            <p class="cards__text">Любимый: ${e.favorite? 'да' : 'нет'}</p>
          </div>
        </div>
      `)
    })
  }
}

export const createElement = new CreateElement();
createElement.renderCards(data);

export default CreateElement;
