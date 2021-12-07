import { QuestionAuthor } from "./questionsAuthor";
import { QuestionPictures } from "./questionsPic";
import { mainMenu } from "./menu";
import { getGenerationQuestions, getPaintDefaultColorIndicators, openQuestions } from "./generationAuthors";
import { saveOptions } from "./saveOptions";
import { getGenerationQuestionsPic } from "./generationPic";
import { getCategoryResultAuthors, getCategoryResultPic, resultMenu } from "./resultCategory";

const playArtist = document.querySelector(".play-artist");
const playPictures = document.querySelector(".play-pictures");
export const categoryMenu = document.querySelector(".category-menu");
const categoryContainer = document.querySelector(".category-container");
const backCategoryMenu = document.querySelector(".category-menu__ico-back");

export class Category {
  constructor(type, questions) {
    this.type = type;
    this.questions = questions.slice(type * 10, type * 10 + 10);
    this.score = 0;
    this.current = 0;
  }

  next() {
    if (this.current > 9) {
      this.end();
    } else {
      this.current += 1;
      return this.current;
    }
  }

  scoreQuiz(index) {
    const value = this.questions[this.current].answerCheck(index);
    this.score += value;
    let correct = -1;
    if (value >= 1) {
      correct = index;
    } else {
      for (let i = 0; i < this.questions[this.current].answers.length; i++) {
        if (this.questions[this.current].answers[i] === this.questions[this.current].answerRight) {
          correct = i;
          break;
        }
      }
    }
    return correct;
  }

  end() {
    console.log(this.score);
  }
}

export const questionsAuthors = [];
export const categoryAuthors = [];
export const questionsPic = [];
export const categoryPic = [];

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
  mainMenu.classList.add("pt-page-rotatePushBottom");
  categoryMenu.classList.add("pt-page-ontop");
  categoryMenu.classList.add("pt-page-current");
  categoryMenu.classList.add("pt-page-rotatePushTop");
  window.setTimeout(() => {
    mainMenu.classList.remove("pt-page-current");
    categoryMenu.classList.remove("pt-page-ontop");
    categoryMenu.classList.remove("pt-page-rotatePushTop");
    mainMenu.classList.remove("pt-page-rotatePushBottom");
  }, 1000);
}

function closeCategory() {
  categoryMenu.classList.add("pt-page-rotatePushBottom");
  mainMenu.classList.add("pt-page-ontop");
  mainMenu.classList.add("pt-page-current");
  mainMenu.classList.add("pt-page-rotatePushTop");
  window.setTimeout(() => {
    categoryMenu.classList.remove("pt-page-current");
    mainMenu.classList.remove("pt-page-ontop");
    mainMenu.classList.remove("pt-page-rotatePushTop");
    categoryMenu.classList.remove("pt-page-rotatePushBottom");
  }, 1000);
}

function openCategoryResult() {
  categoryMenu.classList.add("pt-page-rotatePushBottom");
  resultMenu.classList.add("pt-page-ontop");
  resultMenu.classList.add("pt-page-current");
  resultMenu.classList.add("pt-page-rotatePushTop");
  window.setTimeout(() => {
    categoryMenu.classList.remove("pt-page-current");
    resultMenu.classList.remove("pt-page-ontop");
    resultMenu.classList.remove("pt-page-rotatePushTop");
    categoryMenu.classList.remove("pt-page-rotatePushBottom");
  }, 1000);
}

function getCategoryAuthorsContainer() {
  categoryContainer.innerHTML = "";
  questionsAuthors.length = 0;
  categoryAuthors.length = 0;
  setCategoryAuthors();
  let count = 1;
  for (let i = 0; i < categoryAuthors.length; i++) {
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
    img.src = `./assets/images/img/${categoryAuthors[i].questions[0].question}.jpg`;
    img.alt = `category`;
    categoryContainer.append(div);
    div.append(img);
    div.append(nameCategory);
    div.append(categoryScoreResult);
    div.append(buttonsScore);

    buttonsScore.textContent = `Результаты`;
    nameCategory.textContent = `${count}`;
    categoryScoreResult.textContent = `${categoryAuthors[i].score} / 10`;
    if (saveOptions.scoreCategoryAuthors[i] > 0) {
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
    }

    buttonsScore.addEventListener("click", () => {
      openCategoryResult();
      getCategoryResultAuthors(categoryAuthors[i], i + 1);
    });
    img.addEventListener("click", (e) => {
      openQuestions();
      categoryAuthors[i].current = 0;
      categoryAuthors[i].score = 0;
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
      getPaintDefaultColorIndicators();
      getGenerationQuestions(categoryAuthors[i]);
    });
    count += 1;
  }
  openCategory();
}

function getCategoryPicContainer() {
  categoryContainer.innerHTML = "";
  questionsPic.length = 0;
  categoryPic.length = 0;
  setCategoryPic();
  let count = 1;
  for (let i = 0; i < categoryPic.length; i++) {
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
    img.src = `./assets/images/img/${categoryPic[i].questions[0].answerRight}.jpg`;
    img.alt = `category`;
    categoryContainer.append(div);
    div.append(img);
    div.append(nameCategory);
    div.append(categoryScoreResult);
    div.append(buttonsScore);
    buttonsScore.textContent = `Результаты`;
    nameCategory.textContent = `${count}`;
    categoryScoreResult.textContent = `${categoryPic[i].score} / 10`;
    if (saveOptions.scoreCategoryPic[i] > 0) {
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
    }

    img.addEventListener("click", (e) => {
      openQuestions();
      categoryPic[i].current = 0;
      categoryPic[i].score = 0;
      img.classList.add("active__category");
      buttonsScore.classList.add("active__button-score");
      getPaintDefaultColorIndicators();
      getGenerationQuestionsPic(categoryPic[i]);
    });
    buttonsScore.addEventListener("click", () => {
      openCategoryResult();
      getCategoryResultPic(categoryPic[i], i + 1);
    });
    count += 1;
  }
  openCategory();
}

playArtist.addEventListener("click", () => getCategoryAuthorsContainer());
playPictures.addEventListener("click", () => getCategoryPicContainer());
backCategoryMenu.addEventListener("click", closeCategory);
