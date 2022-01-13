import { categoryMenu } from "./categoryMethods";
import { addAnimation, delAnimation } from "./helperFunc";
import images from "./images";
import { mainMenu } from "./menu";
import { saveOptions } from "./saveOptions";

export const resultMenu = document.querySelector(".result-menu");
export const resultMenuContainer = document.querySelector(".result-menu__container");
const resultMenuImage = document.querySelector(".result-menu__image-category");
const resultMenuTitle = document.querySelector(".image-category__title");
const backResultMenu = document.querySelector(".result-menu__back-ico");
const backResultMenuToHome = document.querySelector(".result-menu__ico-home");

function closeResultMenu() {
  addAnimation(resultMenu, categoryMenu);
  window.setTimeout(() => {
    delAnimation(resultMenu, categoryMenu);
  }, 1000);
  resultMenuContainer.innerHTML = "";
}

function closeResultMenuToHome() {
  addAnimation(resultMenu, mainMenu);
  window.setTimeout(() => {
    delAnimation(resultMenu, mainMenu);
  }, 1000);
  resultMenuContainer.innerHTML = "";
}

export function getCategoryResultAuthors(arr, count) {
  resultMenuContainer.innerHTML = "";

  const imgCategory = document.createElement("img");
  imgCategory.src = `./assets/images/full/${arr.questions[0].question}full.jpg`;
  imgCategory.alt = "category";
  resultMenuImage.append(imgCategory);
  resultMenuTitle.textContent = `${count}`;
  const arrQuestions = [...arr.questions];
  arrQuestions.forEach((elem) => {
    const divCardContainer = document.createElement("div");
    const divImgContainer = document.createElement("div");
    const img = document.createElement("img");
    const divInfo = document.createElement("div");
    const name = document.createElement("p");
    const author = document.createElement("p");
    const year = document.createElement("p");
    divCardContainer.classList.add("image-card__container");
    divImgContainer.classList.add("image-question__container");
    img.classList.add("image-question__container-img");
    divInfo.classList.add("image-question__container-info");
    img.src = `./assets/images/img/${elem.question}.jpg`;
    img.alt = "question";
    resultMenuContainer.append(divCardContainer);
    divCardContainer.append(divImgContainer);
    divImgContainer.append(img);
    divImgContainer.append(divInfo);
    divInfo.append(name);
    divInfo.append(author);
    divInfo.append(year);
    name.textContent = `${images[elem.question].name}`;
    author.textContent = `${images[elem.question].author}`;
    year.textContent = `${images[elem.question].year}`;

    divImgContainer.addEventListener("click", () => {
      divCardContainer.classList.toggle("flip");
    });
    if (saveOptions.rightQuestion[+elem.question]) {
      img.classList.add("active__category-result");
    }
  });
}

export function getCategoryResultPic(arr, count) {
  resultMenuContainer.innerHTML = "";

  const imgCategory = document.createElement("img");
  imgCategory.src = `./assets/images/full/${arr.questions[0].answerRight}full.jpg`;
  imgCategory.alt = "category";
  resultMenuImage.append(imgCategory);
  resultMenuTitle.textContent = `${count}`;
  const arrQuestions = [...arr.questions];
  arrQuestions.forEach((elem) => {
    const divCardContainer = document.createElement("div");
    const divImgContainer = document.createElement("div");
    const img = document.createElement("img");
    const divInfo = document.createElement("div");
    const name = document.createElement("p");
    const author = document.createElement("p");
    const year = document.createElement("p");
    divCardContainer.classList.add("image-card__container");
    divImgContainer.classList.add("image-question__container");
    img.classList.add("image-question__container-img");
    divInfo.classList.add("image-question__container-info");
    img.src = `./assets/images/img/${elem.answerRight}.jpg`;
    img.alt = "question";
    resultMenuContainer.append(divCardContainer);
    divCardContainer.append(divImgContainer);
    divImgContainer.append(img);
    divImgContainer.append(divInfo);
    divInfo.append(name);
    divInfo.append(author);
    divInfo.append(year);
    name.textContent = `${images[elem.answerRight].name}`;
    author.textContent = `${images[elem.answerRight].author}`;
    year.textContent = `${images[elem.answerRight].year}`;

    divImgContainer.addEventListener("click", () => {
      divCardContainer.classList.toggle("flip");
    });
    if (saveOptions.rightQuestion[+elem.answerRight]) {
      img.classList.add("active__category-result");
    }
  });
}

backResultMenu.addEventListener("click", closeResultMenu);
backResultMenuToHome.addEventListener("click", closeResultMenuToHome);
