import { rightAudio, victoryAudio, wrongAudio } from './audioGameSupport';
import { categoryMenu } from './category';
import { timerQuestions } from './menu';
import { saveOptions } from './saveOptions';

export const questionsContainer = document.querySelector('.questions-container');
export const questionsMenu = document.querySelector('.questions-menu');
export const progressTime = document.querySelector('.timer-progress');
export const progressBar = document.getElementById('use-progress');
export const timerContainer = document.querySelector('.timer-container');
export const timeGameValue = document.querySelector('.time-game');
export const timeGameChecked = document.getElementById('time');
export const settingsTimeButtonsContainer = document.querySelector('.time-answer__container');

export function openQuestions() {
  categoryMenu.style.display = 'none';
  questionsMenu.style.display = 'flex';
}

function closeQuestions() {

}

export function exitQuestionsToCategories() {
  questionsContainer.innerHTML = '';
  questionsMenu.style.display = 'none';
  categoryMenu.style.display = 'flex';
}

export function getGenerationQuestions(arr) {
  questionsContainer.innerHTML = '';
  function listenerTimer() {
    if(progressBar.value == 0 && arr.current < 10) {
      console.log('create')
      resultAnswer(arr, undefined);
    }
  }
  console.log(saveOptions.timer)
  let cancelTimer = timerQuestions(progressTime, progressBar, timeGameValue.value);
  progressBar.addEventListener('change', listenerTimer, {once: true});

  let div = document.createElement('div');
  let img = document.createElement('img');
  let h2 = document.createElement('h2');
  let answersDiv = document.createElement('div');
  let indicatorContainer = document.createElement('div');
  answersDiv.classList.add('answers-container');
  indicatorContainer.classList.add('indicator-container');
  img.classList.add('questions__img');
  h2.classList.add('questions-title');
  img.src = `./assets/images/img/${arr.questions[arr.current].question}.jpg`;
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
  for (let i = 0; i < arr.questions[arr.current].answers.length; i++) {
    let button = document.createElement('button');
    button.classList.add('answers__button')
    button.addEventListener('click', e => {
      arr.scoreQuiz(i)
      getPaintIndication(arr, i)
      resultAnswer(arr, i);
      cancelTimer();
      progressBar.removeEventListener('change', listenerTimer);

    })
    answersDiv.append(button);
    button.textContent = arr.questions[arr.current].answers[i];
  }
}
function getPaintIndication(arr, i) {
  document.querySelectorAll('.indicator-answer').forEach(e => {
    if(arr.questions[arr.current].answerCheck(i)) {
      e.classList.add('right-answer__button');
    } else {
      e.classList.add('wrong-answer__button');
    }
  })
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
  submitImg.src = `./assets/images/img/${arr.questions[arr.current].question}.jpg`;
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
    rightAudio.play();
  } else {
    divPopup.append(divIco);
    divIco.classList.add('wrong-answer__ico');
    wrongAudio.play();
  }
  document.querySelectorAll('.answers__button').forEach(e=> {
    e.style.pointerEvents = 'none';
  })
}

export function scoreResult(score) {
  victoryAudio.play();
  document.querySelector('.answer-popup').innerHTML = '';

  let scoreContainer = document.createElement('div');
  let scoreTitle = document.createElement('h2');
  let scoreSubtitle = document.createElement('p');
  let scoreResult = document.createElement('p');
  let scoreButton = document.createElement('button');

  scoreContainer.classList.add('popup-score');
  scoreTitle.classList.add('popup-score__title');
  scoreSubtitle.classList.add('popup-score__subtitle');
  scoreResult.classList.add('popup-score__result');
  scoreButton.classList.add('popup-score__button');

  questionsContainer.append(scoreContainer);
  scoreContainer.append(scoreTitle);
  scoreTitle.textContent = 'Игра завершена';
  scoreContainer.append(scoreSubtitle);
  scoreSubtitle.textContent = 'Ваш результат:';
  scoreContainer.append(scoreResult);
  scoreResult.textContent = `${score} / 10`;
  scoreContainer.append(scoreButton);
  scoreButton.textContent = 'Продолжить';
  scoreButton.addEventListener('click', () => {
    exitQuestionsToCategories();
  })
}

function nextAnswer(arr) {
  if(arr.current > 8) {
    console.log(arr.current)
    scoreResult(arr.score);
    document.querySelectorAll('.category-score__result').forEach((e, i) => {
      if(arr.type === i) {
      saveOptions.scoreCategoryAuthors[i] = arr.score;
      saveOptions.save();
      e.textContent = `${arr.score} / 10`;
      }
    })

  } else {
    arr.next();
    getGenerationQuestions(arr);
  }

}


