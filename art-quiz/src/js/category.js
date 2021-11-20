import { QuestionAuthor } from './questionsAuthor';
import { QuestionPictures } from './questionsPic';
import { mainMenu } from './menu';
import { getGenerationQuestions, openQuestions } from './generationAuthors';
import { saveOptions } from './saveOptions';
import { getGenerationQuestionsPic } from './generationPic';
import { getCategoryResultAuthors, getCategoryResultPic, resultMenu } from './resultCategory';

const playArtist = document.querySelector('.play-artist');
const playPictures = document.querySelector('.play-pictures');
export const categoryMenu = document.querySelector('.category-menu');
const categoryContainer = document.querySelector('.category-container');
const backCategoryMenu = document.querySelector('.category-menu__ico-back');

export class Category {
  constructor(type, questions) {
    this.type = type;
    this.questions = questions.slice(type*10, type*10+10);
    this.score = 0;
    this.current = 0;
  }
  next() {
    if (this.current > 9) {
      this.end()
    } else {
      return this.current++;
    }
  }
  scoreQuiz(index) {
    let value = this.questions[this.current].answerCheck(index);
    this.score += value;
    let correct = -1;
    if (value >= 1) {
      correct = index;
    }
    else {
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
    console.log(score)
  }
}

export let questionsAuthors = [];
export let categoryAuthors = [];
export let questionsPic = [];
export let categoryPic = [];

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
  mainMenu.style.display = 'none';
  categoryMenu.style.display = 'flex';
}

function closeCategory() {
  categoryMenu.style.display = 'none';
  mainMenu.style.display = 'flex';
  categoryContainer.innerHTML = '';
}

function openCategoryResult() {
  categoryMenu.style.display = 'none';
  resultMenu.style.display = 'flex';
}

function getCategoryAuthorsContainer() {
  questionsAuthors = [];
  categoryAuthors = [];
  setCategoryAuthors()
  let count = 1;
  for (let i = 0; i < categoryAuthors.length; i++) {
    const img = document.createElement('img');
    const div = document.createElement('div');
    const nameCategory = document.createElement('p');
    const categoryScoreResult = document.createElement('p');
    const buttonsScore = document.createElement('button');
    buttonsScore.classList.add('category-container__button-score');
    categoryScoreResult.classList.add('category-score__result');
    div.classList.add('category-container__img');
    nameCategory.classList.add('category__type');
    img.classList.add('category__img');
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
    if(saveOptions.scoreCategoryAuthors[i] > 0) {
      img.classList.add('active__category');
    }

    img.addEventListener('click', e => {
      openQuestions()
      categoryAuthors[i].current = 0;
      categoryAuthors[i].score = 0;
      img.classList.add('active__category');
      getGenerationQuestions(categoryAuthors[i])
    })
    buttonsScore.addEventListener('click', () => {
      openCategoryResult();
      getCategoryResultAuthors(categoryAuthors[i], i+1);
    })
    count++;
  }
  openCategory();
}

function getCategoryPicContainer() {
  questionsPic = [];
  categoryPic = [];
  setCategoryPic()
  console.log(categoryPic)
  let count = 1;
  for (let i = 0; i < categoryPic.length; i++) {
    const img = document.createElement('img');
    const div = document.createElement('div');
    const nameCategory = document.createElement('p');
    const categoryScoreResult = document.createElement('p');
    categoryScoreResult.classList.add('category-score__result');
    const buttonsScore = document.createElement('button');
    buttonsScore.classList.add('category-container__button-score');
    div.classList.add('category-container__img')
    nameCategory.classList.add('category__type')
    img.classList.add('category__img');
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
    console.log(i)
    if(saveOptions.scoreCategoryPic[i] > 0) {
      img.classList.add('active__category');
    }

    img.addEventListener('click', e => {
      openQuestions()
      categoryPic[i].current = 0;
      categoryPic[i].score = 0;
      img.classList.add('active__category');
      getGenerationQuestionsPic(categoryPic[i])
    })
    buttonsScore.addEventListener('click', () => {
      openCategoryResult();
      getCategoryResultPic(categoryPic[i], i+1);
    })
    count++;
  }
  openCategory();
}

playArtist.addEventListener('click', () => getCategoryAuthorsContainer());
playPictures.addEventListener('click', () => getCategoryPicContainer());
backCategoryMenu.addEventListener('click', closeCategory);

