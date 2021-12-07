import { rightAudio, wrongAudio } from "./audioGameSupport";
import { categoryMenu } from "./category";
import { backQuestionsMenu, backQuestionsMenuToHome, indicatorContainer, progressBar, progressTime, questionsContainer, questionsMenu, scoreResult, timeGameChecked, timeGameValue } from "./generationAuthors";
import { mainMenu, timerQuestions } from "./menu";
import { saveOptions } from "./saveOptions";

export function getGenerationQuestionsPic(arr) {
  questionsContainer.innerHTML = '';
  function listenerTimer() {
    if(progressBar.value === 0 && arr.current < 10) {
      getPaintIndicatorsPic(arr, undefined);
      resultAnswerPic(arr, undefined);
    }
  }
  const cancelTimerPic = timerQuestions(progressTime, progressBar, timeGameValue.value);
  progressBar.addEventListener('change', listenerTimer, {once: true});

  function closeQuestionsPic() {
    questionsContainer.innerHTML = '';
    cancelTimerPic();
    questionsMenu.classList.add('pt-page-rotatePushBottom');
    categoryMenu.classList.add('pt-page-ontop');
    categoryMenu.classList.add('pt-page-current');
    categoryMenu.classList.add('pt-page-rotatePushTop');
    window.setTimeout(() => {
      questionsMenu.classList.remove('pt-page-current');
      categoryMenu.classList.remove('pt-page-ontop');
      categoryMenu.classList.remove('pt-page-rotatePushTop');
      questionsMenu.classList.remove('pt-page-rotatePushBottom');
    }, 1000);
  }

  function closeQuestionsPicOpenMainMenu() {
    questionsContainer.innerHTML = '';
    cancelTimerPic();
    questionsMenu.classList.add('pt-page-rotatePushBottom');
    mainMenu.classList.add('pt-page-ontop');
    mainMenu.classList.add('pt-page-current');
    mainMenu.classList.add('pt-page-rotatePushTop');
    window.setTimeout(() => {
      questionsMenu.classList.remove('pt-page-current');
      mainMenu.classList.remove('pt-page-ontop');
      mainMenu.classList.remove('pt-page-rotatePushTop');
      questionsMenu.classList.remove('pt-page-rotatePushBottom');
    }, 1000);
  }

  if(saveOptions.timer) {
    backQuestionsMenu.addEventListener('click', closeQuestionsPic);
    backQuestionsMenuToHome.addEventListener('click', closeQuestionsPicOpenMainMenu);
  }

  const h2 = document.createElement('h2');
  const div = document.createElement('div');

  h2.classList.add('questions-title');
  div.classList.add('answers-container');
  questionsContainer.append(h2);
  h2.textContent = arr.questions[arr.current].question;
  questionsContainer.append(div);
  arr.questions[arr.current].answers.forEach((e, i) => {
    const answerDiv = document.createElement('div');
    const img = document.createElement('img');
    answerDiv.classList.add('image-answer__container');
    img.src = `./assets/images/img/${arr.questions[arr.current].answers[i]}.jpg`;
    img.alt = 'question';
    div.append(answerDiv);
    answerDiv.append(img);
    answerDiv.addEventListener('click', () => {
      arr.scoreQuiz(i);
      getPaintIndicatorsPic(arr, i);
      resultAnswerPic(arr, i);
      if(timeGameChecked.checked) {
        cancelTimerPic();
      }
      progressBar.removeEventListener('change', listenerTimer);
    });
  });
}

export function getPaintIndicatorsPic(arr, i) {
  indicatorContainer.forEach((e, index) => {
    if(index === arr.current) {
      if(arr.questions[arr.current].answerCheck(i)) {
          e.classList.add('right-answer__button');
      } else {
          e.classList.add('wrong-answer__button');
      }
    }
  });
}

function resultAnswerPic(arr, i) {
  const divPopup = document.createElement('div');
  const submitAnswer = document.createElement('button');
  const submitImg = document.createElement('img');
  const p = document.createElement('p');
  const divIco = document.createElement('div');
  divPopup.classList.add('answer-popup');
  submitImg.classList.add('submit-img');
  submitAnswer.classList.add('submit-button');
  submitAnswer.addEventListener('click', () => nextAnswerPic(arr));
  submitImg.src = `./assets/images/img/${arr.questions[arr.current].answerRight}.jpg`;
  submitImg.alt = `question`;
  questionsContainer.append(divPopup);
  divPopup.append(p);
  p.textContent = `Правильный ответ:`;
  divPopup.append(submitImg);
  divPopup.append(submitAnswer);
  submitAnswer.textContent = `Продолжить`;

  if(arr.questions[arr.current].answerCheck(i)) {
    divPopup.append(divIco);
    divIco.classList.add('right-answer__ico');
    rightAudio.play();
    saveOptions.rightQuestion[+arr.questions[arr.current].answerRight] = 1;
    saveOptions.save();
  } else {
    divPopup.append(divIco);
    divIco.classList.add('wrong-answer__ico');
    wrongAudio.play();
    saveOptions.rightQuestion[+arr.questions[arr.current].answerRight] = 0;
    saveOptions.save();
  }
  document.querySelectorAll('.answers__button').forEach(e=> {
    e.style.pointerEvents = 'none';
  });
}

function nextAnswerPic(arr) {
  if(arr.current > 8) {
    console.log(arr.current);
    scoreResult(arr.score);
    document.querySelectorAll('.category-score__result').forEach((e, i) => {
      if(arr.type === i) {
      saveOptions.scoreCategoryPic[i] = arr.score;
      saveOptions.save();
      e.textContent = `${arr.score} / 10`;
      }
    });

  } else {
    arr.next();
    getGenerationQuestionsPic(arr);
  }

}
