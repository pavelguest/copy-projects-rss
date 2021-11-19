import { categoryMenu } from "./category";

export const resultMenu = document.querySelector('.result-menu');
export const resultMenuContainer = document.querySelector('.result-menu__container');
const resultMenuImage = document.querySelector('.result-menu__image-category');
const resultMenuTitle = document.querySelector('.image-category__title');
const backResultMenu = document.querySelector('.result-menu__back-ico');

function closeResultMenu () {
  resultMenu.style.display = 'none';
  categoryMenu.style.display = 'flex';
}

export function getCategoryResultAuthors(arr, count) {
  resultMenuContainer.innerHTML = '';

  resultMenuImage.style.background = `url(./assets/images/img/${arr.questions[0].question}.jpg)`;
  resultMenuTitle.textContent = `${count}`;
  for (let i = 0; i < arr.questions.length; i++) {
    const divImgContainer = document.createElement('div');
    const img = document.createElement('img');
    divImgContainer.classList.add('image-question__container');
    img.src = `./assets/images/img/${arr.questions[i].question}.jpg`;
    img.alt = 'question';
    resultMenuContainer.append(divImgContainer);
    divImgContainer.append(img);
  }
}

export function getCategoryResultPic(arr, count) {
  resultMenuContainer.innerHTML = '';

  resultMenuImage.style.background = `url(./assets/images/img/${arr.questions[0].answerRight}.jpg)`;
  resultMenuTitle.textContent = `${count}`;
  for (let i = 0; i < arr.questions.length; i++) {
    const divImgContainer = document.createElement('div');
    const img = document.createElement('img');
    divImgContainer.classList.add('image-question__container');
    img.src = `./assets/images/img/${arr.questions[i].answerRight}.jpg`;
    img.alt = 'question';
    resultMenuContainer.append(divImgContainer);
    divImgContainer.append(img);
  }
}


backResultMenu.addEventListener('click', closeResultMenu);
