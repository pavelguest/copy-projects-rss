import data from "./data";

interface Idata {
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
  static container = document.querySelector('.cards') as HTMLElement;

  static renderElement(container: HTMLElement, elem: string, className: string, text: string) {
    let element: HTMLImageElement | HTMLElement = document.createElement(elem);
    element.classList.add(className);
    if(element instanceof HTMLImageElement) {
      element.src = `../assets/toys/${text}.png`;
      element.alt = 'ball'
    } else {
      element.textContent = text;
    }
    container.append(element);
  }
  renderCard(data: Idata[]) {
    data.forEach(e=> {
      let cardsItem = document.createElement('div');
      let textContainer = document.createElement('div');
      textContainer.classList.add('cards__text-container');
      cardsItem.classList.add('cards__item');
      CreateElement.container.append(cardsItem);
      let favorite = e.favorite? 'да' : 'нет';
      CreateElement.renderElement(cardsItem, 'h3', 'cards__subtitle', e.name);
      CreateElement.renderElement(cardsItem, 'img', 'cards__img', e.num);
      cardsItem.append(textContainer)
      CreateElement.renderElement(textContainer, 'p', 'cards__text', `Количество: ${e.count}`);
      CreateElement.renderElement(textContainer, 'p', 'cards__text', `Год покупки: ${e.year}`);
      CreateElement.renderElement(textContainer, 'p', 'cards__text', `Форма: ${e.shape}`);
      CreateElement.renderElement(textContainer, 'p', 'cards__text', `Цвет: ${e.color}`);
      CreateElement.renderElement(textContainer, 'p', 'cards__text', `Размер: ${e.size}`);
      CreateElement.renderElement(textContainer, 'p', 'cards__text', `Любимый: ${favorite}`);
    })
  }
}

const app = new CreateElement();
app.renderCard(data);

export default CreateElement;
