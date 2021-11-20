import { categoryMenu } from "./category";
import images from "./images";
import { saveOptions } from "./saveOptions";

export const resultMenu = document.querySelector('.result-menu');
export const resultMenuContainer = document.querySelector('.result-menu__container');
const resultMenuImage = document.querySelector('.result-menu__image-category');
const resultMenuTitle = document.querySelector('.image-category__title');
const backResultMenu = document.querySelector('.result-menu__back-ico');

function closeResultMenu () {
  resultMenu.style.display = 'none';
  categoryMenu.style.display = 'flex';
}

function getInfoQuestion(img, div, divImgContainer) {
  // img.style.display = 'none';
  // div.style.display = 'flex';
  divImgContainer.classList.toggle('flip')
}

// function leaveInfoQuestion(img, div) {
//   img.style.display = 'flex';
//   div.style.display = 'none';
// }

export function getCategoryResultAuthors(arr, count) {
  resultMenuContainer.innerHTML = '';

  const imgCategory = document.createElement('img');
  imgCategory.src = `./assets/images/img/${arr.questions[0].question}.jpg`;
  imgCategory.alt = 'category';
  resultMenuImage.append(imgCategory);
  resultMenuTitle.textContent = `${count}`;
  for (let i = 0; i < arr.questions.length; i++) {
    const divImgContainer = document.createElement('div');
    const img = document.createElement('img');
    const divInfo = document.createElement('div');
    const name = document.createElement('p');
    const author = document.createElement('p');
    const year = document.createElement('p');
    divImgContainer.classList.add('image-question__container');
    img.classList.add('image-question__container-img')
    divInfo.classList.add('image-question__container-info');
    img.src = `./assets/images/img/${arr.questions[i].question}.jpg`;
    img.alt = 'question';
    resultMenuContainer.append(divImgContainer);
    divImgContainer.append(img);
    divImgContainer.append(divInfo);
    divInfo.append(name);
    divInfo.append(author);
    divInfo.append(year);
    name.textContent = `${images[arr.questions[i].question].name}`;
    author.textContent = `${images[arr.questions[i].question].author}`;
    year.textContent = `${images[arr.questions[i].question].year}`;

    divImgContainer.addEventListener('click', () => {
      getInfoQuestion(img, divInfo, divImgContainer)
    })
    // divImgContainer.addEventListener('mouseleave', () => {
    //   leaveInfoQuestion(img, divInfo)
    // })
    if(saveOptions.rightQuestion[+arr.questions[i].question]) {
      img.classList.add('active__category-result')
    }
  }
}

export function getCategoryResultPic(arr, count) {
  resultMenuContainer.innerHTML = '';

  const imgCategory = document.createElement('img');
  imgCategory.src = `./assets/images/img/${arr.questions[0].answerRight}.jpg`;
  imgCategory.alt = 'category';
  resultMenuImage.append(imgCategory);
  resultMenuTitle.textContent = `${count}`;
  for (let i = 0; i < arr.questions.length; i++) {
    const divImgContainer = document.createElement('div');
    const img = document.createElement('img');
    const divInfo = document.createElement('div');
    const name = document.createElement('p');
    const author = document.createElement('p');
    const year = document.createElement('p');
    divImgContainer.classList.add('image-question__container');
    img.classList.add('image-question__container-img')
    divInfo.classList.add('image-question__container-info');
    img.src = `./assets/images/img/${arr.questions[i].answerRight}.jpg`;
    img.alt = 'question';
    resultMenuContainer.append(divImgContainer);
    divImgContainer.append(img);
    divImgContainer.append(divInfo);
    divInfo.append(name);
    divInfo.append(author);
    divInfo.append(year);
    name.textContent = `${images[arr.questions[i].answerRight].name}`;
    author.textContent = `${images[arr.questions[i].answerRight].author}`;
    year.textContent = `${images[arr.questions[i].answerRight].year}`;
    divImgContainer.addEventListener('click', () => {
      getInfoQuestion(img, divInfo)
    })
    divImgContainer.addEventListener('mouseleave', () => {
      leaveInfoQuestion(img, divInfo)
    })
    if(saveOptions.rightQuestion[+arr.questions[i].answerRight]) {
      img.classList.add('active__category-result')
    }
  }
}


backResultMenu.addEventListener('click', closeResultMenu);
