import images from './images';
import { mainMenu } from './menu';

const playArtist = document.querySelector('.play-artist');
const playPictures = document.querySelector('.play-pictures');
const categoryMenu = document.querySelector('.category-menu');
export const categoryContainer = document.querySelector('.category-container');
const playType = document.querySelector('.main-menu__buttons');
const backCategoryMenu = document.querySelector('.category-menu__ico-back');


export class Category {
  constructor(type, questions) {
    this.type = type;
    this.questions = questions.slice(type*10, type*10+10)
  }

}

let b = new Category(5, images)
console.log(b)

function openCategory() {
  mainMenu.style.display = 'none';
  categoryMenu.style.display = 'flex';
}
function closeCategory() {
  categoryMenu.style.display = 'none';
  mainMenu.style.display = 'flex';
  categoryContainer.innerHTML = '';
}

function createCategoryContainer(a, b) {
  let count = 1;
  for (let i = a; i < b; i++) {
    const numCategory = new Category(i, images);
    const img = document.createElement('img');
    const div = document.createElement('div');
    img.classList.add('category__img');
    img.src = `../assets/images/img/${numCategory.questions[0].imageNum}.jpg`;
    img.alt = `category`;
    categoryContainer.append(div);
    div.textContent = `${count}`;
    div.append(img);
    count++;
  }
  openCategory();
}


playArtist.addEventListener('click', () => createCategoryContainer(0, 12));
playPictures.addEventListener('click', () => createCategoryContainer(12, 24));
backCategoryMenu.addEventListener('click', closeCategory);

