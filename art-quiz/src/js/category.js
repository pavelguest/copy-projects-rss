import { QuestionAuthor } from './questionsAuthor';
import { QuestionPictures } from './questionsPic';
import { mainMenu } from './menu';
import { getGenerationQuestions, openQuestions } from './generationAuthors';

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
  }
}

function setCategoryPic() {
  for (let i = 120; i < 240; i++) {
    questionsPic.push(new QuestionPictures(i));
  }
  for (let i = 0; i < 12; i++) {
    categoryPic.push(new Category(i, questionsPic));
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
    categoryScoreResult.classList.add('category-score__result');
    div.classList.add('category-container__img')
    nameCategory.classList.add('category__type')
    img.classList.add('category__img');
    img.src = `./assets/images/img/${categoryAuthors[i].questions[0].question}.jpg`;
    img.alt = `category`;
    categoryContainer.append(div);
    div.append(nameCategory);
    div.append(categoryScoreResult);
    nameCategory.textContent = `${count}`;
    categoryScoreResult.textContent = `Результат: 0`;
    div.append(img);
    count++;

    div.addEventListener('click', e => {
      openQuestions()
      categoryAuthors[i].current = 0;
      categoryAuthors[i].score = 0;
      getGenerationQuestions(categoryAuthors[i])
      div.classList.add('active__category');
    })
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
    const p = document.createElement('p');
    div.classList.add('category-container__img')
    p.classList.add('category__type')
    img.classList.add('category__img');
    img.src = `./assets/images/img/${categoryPic[i].questions[0].answerRight}.jpg`;
    img.alt = `category`;
    categoryContainer.append(div);
    div.append(p);
    p.textContent = `${count}`;
    div.append(img);
    count++;

    div.addEventListener('click', e => {
      // openQuestions()
      // getGenerationQuestions(categoryPic[i])
    })
  }
  openCategory();
}

playArtist.addEventListener('click', () => getCategoryAuthorsContainer());
playPictures.addEventListener('click', () => getCategoryPicContainer());
backCategoryMenu.addEventListener('click', closeCategory);

