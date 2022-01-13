import { QuestionAuthor } from "./questionsAuthor";
import { QuestionPictures } from "./questionsPic";
import { mainMenu } from "./menu";
import { getGenerationQuestions, getPaintDefaultColorIndicators, openQuestions } from "./generationAuthors";
import { saveOptions } from "./saveOptions";
import { getGenerationQuestionsPic } from "./generationPic";
import { getCategoryResultAuthors, getCategoryResultPic, resultMenu } from "./resultCategory";
import Category from "./Caterogy";
import { addAnimation, delAnimation } from "./helperFunc";

const playArtist = document.querySelector(".play-artist");
const playPictures = document.querySelector(".play-pictures");
const categoryMenu = document.querySelector(".category-menu");
const categoryContainer = document.querySelector(".category-container");
const backCategoryMenu = document.querySelector(".category-menu__ico-back");

const questionsAuthors = [];
const categoryAuthors = [];
const questionsPic = [];
const categoryPic = [];

function setCategoryAuthors() {
  for (let i = 0; i < 120; i++) {
    questionsAuthors.push(new QuestionAuthor(i));
  }
  for (let i = 0; i < 12; i++) {
    categoryAuthors.push(new Category(i, questionsAuthors));
    categoryAuthors[i].score = saveOptions.scoreCategoryAuthors[i];
  }
}

function setCategoryPic() {
  for (let i = 120; i < 240; i++) {
    questionsPic.push(new QuestionPictures(i));
  }
  for (let i = 0; i < 12; i++) {
    categoryPic.push(new Category(i, questionsPic));
    categoryPic[i].score = saveOptions.scoreCategoryPic[i];
  }
}

function openCategory() {
  addAnimation(mainMenu, categoryMenu);
  window.setTimeout(() => {
    delAnimation(mainMenu, categoryMenu);
  }, 1000);
}

function closeCategory() {
  addAnimation(categoryMenu, mainMenu);
  window.setTimeout(() => {
    delAnimation(categoryMenu, mainMenu);
  }, 1000);
}

function openCategoryResult() {
  addAnimation(categoryMenu, resultMenu);
  window.setTimeout(() => {
    delAnimation(categoryMenu, resultMenu);
  }, 1000);
}

function getCategoryAuthorsContainer() {
  categoryContainer.innerHTML = "";
  questionsAuthors.length = 0;
  categoryAuthors.length = 0;
  setCategoryAuthors();
  let count = 1;
  categoryAuthors.forEach((element, i) => {
    const img = document.createElement("img");
    const div = document.createElement("div");
    const nameCategory = document.createElement("p");
    const categoryScoreResult = document.createElement("p");
    const buttonsScore = document.createElement("button");

    buttonsScore.classList.add("category-container__button-score");
    categoryScoreResult.classList.add("category-score__result");
    div.classList.add("category-container__img");
    nameCategory.classList.add("category__type");
    img.classList.add("category__img");
    img.src = `./assets/images/img/${element.questions[0].question}.jpg`;
    img.alt = `category`;
    categoryContainer.append(div);
    div.append(img);
    div.append(nameCategory);
    div.append(categoryScoreResult);
    div.append(buttonsScore);

    buttonsScore.textContent = `Результаты`;
    nameCategory.textContent = `${count}`;
    categoryScoreResult.textContent = `${element.score} / 10`;
    if (saveOptions.scoreCategoryAuthors[i] > 0) {
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
    }

    buttonsScore.addEventListener("click", () => {
      openCategoryResult();
      getCategoryResultAuthors(element, i + 1);
    });
    img.addEventListener("click", (e) => {
      openQuestions();
      element.current = 0;
      element.score = 0;
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
      getPaintDefaultColorIndicators();
      getGenerationQuestions(element);
    });
    count += 1;
  });
  openCategory();
}

function getCategoryPicContainer() {
  categoryContainer.innerHTML = "";
  questionsPic.length = 0;
  categoryPic.length = 0;
  setCategoryPic();
  let count = 1;
  categoryPic.forEach((element, i) => {
    const img = document.createElement("img");
    const div = document.createElement("div");
    const nameCategory = document.createElement("p");
    const categoryScoreResult = document.createElement("p");
    categoryScoreResult.classList.add("category-score__result");
    const buttonsScore = document.createElement("button");
    buttonsScore.classList.add("category-container__button-score");
    div.classList.add("category-container__img");
    nameCategory.classList.add("category__type");
    img.classList.add("category__img");
    img.src = `./assets/images/img/${element.questions[0].answerRight}.jpg`;
    img.alt = `category`;
    categoryContainer.append(div);
    div.append(img);
    div.append(nameCategory);
    div.append(categoryScoreResult);
    div.append(buttonsScore);
    buttonsScore.textContent = `Результаты`;
    nameCategory.textContent = `${count}`;
    categoryScoreResult.textContent = `${element.score} / 10`;
    if (saveOptions.scoreCategoryPic[i] > 0) {
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
    }

    img.addEventListener("click", (e) => {
      openQuestions();
      element.current = 0;
      element.score = 0;
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
      getPaintDefaultColorIndicators();
      getGenerationQuestionsPic(element);
    });
    buttonsScore.addEventListener("click", () => {
      openCategoryResult();
      getCategoryResultPic(element, i + 1);
    });
    count += 1;
  });
  openCategory();
}

playArtist.addEventListener("click", () => getCategoryAuthorsContainer());
playPictures.addEventListener("click", () => getCategoryPicContainer());
backCategoryMenu.addEventListener("click", closeCategory);

export { categoryMenu, questionsAuthors, categoryAuthors, questionsPic, categoryPic };
