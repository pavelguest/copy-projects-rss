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

export function getCategoryResult(arr, count, type) {
  resultMenuContainer.innerHTML = "";

  const srcQuestion = type === "author" ? arr.questions[0].question : arr.questions[0].answerRight;

  const imgCategory = document.createElement("img");
  imgCategory.src = `./assets/images/full/${srcQuestion}full.jpg`;
  imgCategory.alt = "category";
  resultMenuImage.append(imgCategory);
  resultMenuTitle.textContent = `${count}`;
  const arrQuestions = [...arr.questions];
  arrQuestions.forEach((elem) => {
    const elemQuestion = type === "author" ? elem.question : elem.answerRight;

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
    img.src = `./assets/images/img/${elemQuestion}.jpg`;
    img.alt = "question";
    resultMenuContainer.append(divCardContainer);
    divCardContainer.append(divImgContainer);
    divImgContainer.append(img);
    divImgContainer.append(divInfo);
    divInfo.append(name);
    divInfo.append(author);
    divInfo.append(year);
    name.textContent = `${images[elemQuestion].name}`;
    author.textContent = `${images[elemQuestion].author}`;
    year.textContent = `${images[elemQuestion].year}`;

    divImgContainer.addEventListener("click", () => {
      divCardContainer.classList.toggle("flip");
    });
    if (saveOptions.rightQuestion[+elemQuestion]) {
      img.classList.add("active__category-result");
    }
  });
}

backResultMenu.addEventListener("click", closeResultMenu);
backResultMenuToHome.addEventListener("click", closeResultMenuToHome);
