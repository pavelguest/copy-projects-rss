import images from './images';
import { categoryContainer, categoryMenu } from './category';
import { Category } from './category';
import { QuestionAuthor } from './questionsAuthor';
import { QuestionPictures } from './questionsPic';
import { timerQuestions } from './menu';

const questionsContainer = document.querySelector('.questions-container');
const questionsMenu = document.querySelector('.questions-menu');
const answersContainer = document.querySelector('.answers-container');
const progressTime = document.querySelector('.timer-progress');
const progressBar = document.getElementById('use-progress');
const timeGameValue = document.querySelector('.time-game');

let questions = [];
let category = [];
for (let i = 0; i < 120; i++) {
  questions.push(new QuestionAuthor(i));
}
for (let i = 0; i < 12; i++) {
  category.push(new Category(i, questions));
}

console.log(category)

function openQuestions() {
  categoryMenu.style.display = 'none';
  questionsMenu.style.display = 'flex';
}
function closeQuestions() {

}


function getGenerationQuestions(arr) {
  timerQuestions(progressTime, progressBar, timeGameValue.value);

  questionsContainer.innerHTML = '';

  let div = document.createElement('div');
  let img = document.createElement('img');
  let h2 = document.createElement('h2');
  let answersDiv = document.createElement('div');
  let indicatorContainer = document.createElement('div');
  answersDiv.classList.add('answers-container');
  indicatorContainer.classList.add('indicator-container');
  img.classList.add('questions__img');
  h2.classList.add('questions-title');

  img.src = `../assets/images/img/${arr.questions[arr.current].question}.jpg`;
  img.alt = `question`;
  questionsContainer.append(h2);
  h2.textContent = 'Кто автор этой картины?';
  questionsContainer.append(div);
  div.append(img);
  questionsContainer.append(indicatorContainer);
  for (let index = 0; index < arr.questions.length; index++) {
    let indicator = document.createElement('div');
    indicator.classList.add('indicator-answer')
    indicatorContainer.append(indicator);
  }
  questionsContainer.append(answersDiv);
  console.log(arr.questions[arr.current].answers.length)
  for (let i = 0; i < arr.questions[arr.current].answers.length; i++) {
    let button = document.createElement('button');
    button.classList.add('answers__button')
    button.addEventListener('click', e => {
      // getIndicators(arr, i);
      resultAnswer(arr, i);
    })
    answersDiv.append(button);
    button.textContent = arr.questions[arr.current].answers[i];
  }
}

function getIndicators(arr, i) {
  const indicatorContainer = document.querySelectorAll('.indicator-answer');
  console.log(indicatorContainer)
  if(arr.questions[arr.current].answerCheck(i)) {
    indicatorContainer.forEach((e, i) => {
      if(i == arr.questions[arr.current].question)
      e.classList.add('right-answer');
    })
  } else {
    indicatorContainer.forEach((e, i) => {
      if(i == arr.questions[arr.current].question)
      e.classList.add('wrong-answer');
    })
  }
}

function resultAnswer(arr, i) {
  let divPopup = document.createElement('div');
  let submitAnswer = document.createElement('button');
  let submitImg = document.createElement('img');
  let p = document.createElement('p');
  let textRightAnswer = document.createElement('p');
  let divIco = document.createElement('div');
  divPopup.classList.add('answer-popup');
  submitImg.classList.add('submit-img');
  submitAnswer.classList.add('submit-button');
  submitAnswer.addEventListener('click', () => nextAnswer(arr));
  submitImg.src = `../assets/images/img/${arr.questions[arr.current].question}.jpg`;
  submitImg.alt = `question`;
  questionsContainer.append(divPopup);
  divPopup.append(p);
  divPopup.append(textRightAnswer);
  p.textContent = `Правильный ответ:`;
  textRightAnswer.textContent = `${arr.questions[arr.current].answerRight}`;
  divPopup.append(submitImg);
  divPopup.append(submitAnswer);
  submitAnswer.textContent = `Продолжить`;

  if(arr.questions[arr.current].answerCheck(i)) {
    divPopup.append(divIco);
    divIco.classList.add('right-answer__ico');
  } else {
    divPopup.append(divIco);
    divIco.classList.add('wrong-answer__ico');
  }
  document.querySelectorAll('.answers__button').forEach(e=> {
    e.style.pointerEvents = 'none';
  })
}

function nextAnswer(arr) {
  arr.next();
  getGenerationQuestions(arr);
}


categoryContainer.addEventListener('click', e => {
  const arrList = Array.from(document.querySelectorAll('.category__img'));
  const listItem = arrList.indexOf(e.target);
  if(listItem || listItem == 0) {
    openQuestions()
    getGenerationQuestions(category[listItem])
  }
})

