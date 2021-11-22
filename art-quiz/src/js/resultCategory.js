import { categoryMenu } from "./category";
import images from "./images";
import { mainMenu } from "./menu";
import { saveOptions } from "./saveOptions";

export const resultMenu = document.querySelector('.result-menu');
export const resultMenuContainer = document.querySelector('.result-menu__container');
const resultMenuImage = document.querySelector('.result-menu__image-category');
const resultMenuTitle = document.querySelector('.image-category__title');
const backResultMenu = document.querySelector('.result-menu__back-ico');
const backResultMenuToHome = document.querySelector('.result-menu__ico-home')

function closeResultMenu () {
  resultMenu.classList.add('pt-page-rotatePushBottom');
  categoryMenu.classList.add('pt-page-ontop');
  categoryMenu.classList.add('pt-page-current');
  categoryMenu.classList.add('pt-page-rotatePushTop');
  window.setTimeout(() => {
    resultMenu.classList.remove('pt-page-current');
    categoryMenu.classList.remove('pt-page-ontop');
    categoryMenu.classList.remove('pt-page-rotatePushTop');
    resultMenu.classList.remove('pt-page-rotatePushBottom');
  }, 1000)
  resultMenuContainer.innerHTML = '';
}

function closeResultMenuToHome () {
  resultMenu.classList.add('pt-page-rotatePushBottom');
  mainMenu.classList.add('pt-page-ontop');
  mainMenu.classList.add('pt-page-current');
  mainMenu.classList.add('pt-page-rotatePushTop');
  window.setTimeout(() => {
    resultMenu.classList.remove('pt-page-current');
    mainMenu.classList.remove('pt-page-ontop');
    mainMenu.classList.remove('pt-page-rotatePushTop');
    resultMenu.classList.remove('pt-page-rotatePushBottom');
  }, 1000)
  resultMenuContainer.innerHTML = '';
}

export function getCategoryResultAuthors(arr, count) {
  resultMenuContainer.innerHTML = '';

  const imgCategory = document.createElement('img');
  imgCategory.src = `./assets/images/full/${arr.questions[0].question}full.jpg`;
  imgCategory.alt = 'category';
  resultMenuImage.append(imgCategory);
  resultMenuTitle.textContent = `${count}`;
  for (let i = 0; i < arr.questions.length; i++) {
    const divCardContainer = document.createElement('div');
    const divImgContainer = document.createElement('div');
    const img = document.createElement('img');
    const divInfo = document.createElement('div');
    const name = document.createElement('p');
    const author = document.createElement('p');
    const year = document.createElement('p');
    divCardContainer.classList.add('image-card__container')
    divImgContainer.classList.add('image-question__container');
    img.classList.add('image-question__container-img')
    divInfo.classList.add('image-question__container-info');
    img.src = `./assets/images/img/${arr.questions[i].question}.jpg`;
    img.alt = 'question';
    resultMenuContainer.append(divCardContainer);
    divCardContainer.append(divImgContainer);
    divImgContainer.append(img);
    divImgContainer.append(divInfo);
    divInfo.append(name);
    divInfo.append(author);
    divInfo.append(year);
    name.textContent = `${images[arr.questions[i].question].name}`;
    author.textContent = `${images[arr.questions[i].question].author}`;
    year.textContent = `${images[arr.questions[i].question].year}`;

    divImgContainer.addEventListener('click', () => {
      divCardContainer.classList.toggle('flip');
    })
    if(saveOptions.rightQuestion[+arr.questions[i].question]) {
      img.classList.add('active__category-result')
    }
  }
}

export function getCategoryResultPic(arr, count) {
  resultMenuContainer.innerHTML = '';

  const imgCategory = document.createElement('img');
  imgCategory.src = `./assets/images/full/${arr.questions[0].answerRight}full.jpg`;
  imgCategory.alt = 'category';
  resultMenuImage.append(imgCategory);
  resultMenuTitle.textContent = `${count}`;
  for (let i = 0; i < arr.questions.length; i++) {
    const divCardContainer = document.createElement('div');
    const divImgContainer = document.createElement('div');
    const img = document.createElement('img');
    const divInfo = document.createElement('div');
    const name = document.createElement('p');
    const author = document.createElement('p');
    const year = document.createElement('p');
    divCardContainer.classList.add('image-card__container')
    divImgContainer.classList.add('image-question__container');
    img.classList.add('image-question__container-img')
    divInfo.classList.add('image-question__container-info');
    img.src = `./assets/images/img/${arr.questions[i].answerRight}.jpg`;
    img.alt = 'question';
    resultMenuContainer.append(divCardContainer);
    divCardContainer.append(divImgContainer);
    divImgContainer.append(img);
    divImgContainer.append(divInfo);
    divInfo.append(name);
    divInfo.append(author);
    divInfo.append(year);
    name.textContent = `${images[arr.questions[i].answerRight].name}`;
    author.textContent = `${images[arr.questions[i].answerRight].author}`;
    year.textContent = `${images[arr.questions[i].answerRight].year}`;

    divImgContainer.addEventListener('click', () => {
      divCardContainer.classList.toggle('flip');
    })
    if(saveOptions.rightQuestion[+arr.questions[i].answerRight]) {
      img.classList.add('active__category-result')
    }
  }
}


backResultMenu.addEventListener('click', closeResultMenu);
backResultMenuToHome.addEventListener('click', closeResultMenuToHome);
