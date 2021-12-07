import { rightAudio, victoryAudio, wrongAudio } from "./audioGameSupport";
import { categoryMenu } from "./category";
import { mainMenu, timerQuestions } from "./menu";
import { saveOptions } from "./saveOptions";

export const questionsContainer = document.querySelector(".questions-container");
export const questionsMenu = document.querySelector(".questions-menu");
export const progressTime = document.querySelector(".timer-progress");
export const progressBar = document.getElementById("use-progress");
export const timerContainer = document.querySelector(".timer-container");
export const timeGameValue = document.querySelector(".time-game");
export const timeGameChecked = document.getElementById("time");
export const settingsTimeButtonsContainer = document.querySelector(".time-answer__container");
export const indicatorContainer = document.querySelectorAll(".indicators-container__item");
export const backQuestionsMenu = document.querySelector(".questions-menu__ico-back");
export const backQuestionsMenuToHome = document.querySelector(".questions-menu__ico-home");

export function openQuestions() {
  categoryMenu.classList.add("pt-page-rotatePushBottom");
  questionsMenu.classList.add("pt-page-ontop");
  questionsMenu.classList.add("pt-page-current");
  questionsMenu.classList.add("pt-page-rotatePushTop");
  window.setTimeout(() => {
    categoryMenu.classList.remove("pt-page-current");
    questionsMenu.classList.remove("pt-page-ontop");
    questionsMenu.classList.remove("pt-page-rotatePushTop");
    categoryMenu.classList.remove("pt-page-rotatePushBottom");
  }, 1000);
}

export function exitQuestionsToCategories() {
  questionsContainer.innerHTML = "";
  questionsMenu.classList.add("pt-page-rotatePushBottom");
  categoryMenu.classList.add("pt-page-ontop");
  categoryMenu.classList.add("pt-page-current");
  categoryMenu.classList.add("pt-page-rotatePushTop");
  window.setTimeout(() => {
    questionsMenu.classList.remove("pt-page-current");
    categoryMenu.classList.remove("pt-page-ontop");
    categoryMenu.classList.remove("pt-page-rotatePushTop");
    questionsMenu.classList.remove("pt-page-rotatePushBottom");
  }, 1000);
}

export function getGenerationQuestions(arr) {
  questionsContainer.innerHTML = "";
  function listenerTimer() {
    if (progressBar.value === 0 && arr.current < 10) {
      getPaintIndicators(arr, undefined);
      resultAnswer(arr, undefined);
    }
  }
  const cancelTimer = timerQuestions(progressTime, progressBar, timeGameValue.value);
  progressBar.addEventListener("change", listenerTimer, { once: true });

  function closeQuestions() {
    questionsContainer.innerHTML = "";
    cancelTimer();
    questionsMenu.classList.add("pt-page-rotatePushBottom");
    categoryMenu.classList.add("pt-page-ontop");
    categoryMenu.classList.add("pt-page-current");
    categoryMenu.classList.add("pt-page-rotatePushTop");
    window.setTimeout(() => {
      questionsMenu.classList.remove("pt-page-current");
      categoryMenu.classList.remove("pt-page-ontop");
      categoryMenu.classList.remove("pt-page-rotatePushTop");
      questionsMenu.classList.remove("pt-page-rotatePushBottom");
    }, 1000);
  }

  function closeQuestionsOpenMainMenu() {
    questionsContainer.innerHTML = "";
    cancelTimer();
    questionsMenu.classList.add("pt-page-rotatePushBottom");
    mainMenu.classList.add("pt-page-ontop");
    mainMenu.classList.add("pt-page-current");
    mainMenu.classList.add("pt-page-rotatePushTop");
    window.setTimeout(() => {
      questionsMenu.classList.remove("pt-page-current");
      mainMenu.classList.remove("pt-page-ontop");
      mainMenu.classList.remove("pt-page-rotatePushTop");
      questionsMenu.classList.remove("pt-page-rotatePushBottom");
    }, 1000);
  }

  if (saveOptions.timer) {
    backQuestionsMenu.addEventListener("click", closeQuestions);
    backQuestionsMenuToHome.addEventListener("click", closeQuestionsOpenMainMenu);
  }

  const div = document.createElement("div");
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const answersDiv = document.createElement("div");
  answersDiv.classList.add("answers-container");
  img.classList.add("questions__img");
  h2.classList.add("questions-title");
  img.src = `./assets/images/img/${arr.questions[arr.current].question}.jpg`;
  img.alt = `question`;
  questionsContainer.append(h2);
  h2.textContent = "Кто автор этой картины?";
  questionsContainer.append(div);
  div.append(img);
  questionsContainer.append(answersDiv);
  for (let i = 0; i < arr.questions[arr.current].answers.length; i++) {
    const button = document.createElement("button");
    button.classList.add("answers__button");
    button.addEventListener("click", (e) => {
      arr.scoreQuiz(i);
      getPaintIndicators(arr, i);
      resultAnswer(arr, i);
      if (timeGameChecked.checked) {
        cancelTimer();
      }
      progressBar.removeEventListener("change", listenerTimer);
    });

    answersDiv.append(button);
    button.textContent = arr.questions[arr.current].answers[i];
  }
}

export function getPaintDefaultColorIndicators() {
  indicatorContainer.forEach((e) => {
    e.classList.remove("right-answer__button");
    e.classList.remove("wrong-answer__button");
  });
}

export function getPaintIndicators(arr, i) {
  indicatorContainer.forEach((e, index) => {
    if (index === arr.current) {
      if (arr.questions[arr.current].answerCheck(i)) {
        e.classList.add("right-answer__button");
      } else {
        e.classList.add("wrong-answer__button");
      }
    }
  });
}

function resultAnswer(arr, i) {
  const divPopup = document.createElement("div");
  const submitAnswer = document.createElement("button");
  const submitImg = document.createElement("img");
  const p = document.createElement("p");
  const textRightAnswer = document.createElement("p");
  const divIco = document.createElement("div");
  divPopup.classList.add("answer-popup");
  submitImg.classList.add("submit-img");
  submitAnswer.classList.add("submit-button");
  submitAnswer.addEventListener("click", () => nextAnswer(arr));
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
  if (arr.questions[arr.current].answerCheck(i)) {
    divPopup.append(divIco);
    divIco.classList.add("right-answer__ico");
    rightAudio.play();
    saveOptions.rightQuestion[+arr.questions[arr.current].question] = 1;
    saveOptions.save();
  } else {
    divPopup.append(divIco);
    divIco.classList.add("wrong-answer__ico");
    wrongAudio.play();
    saveOptions.rightQuestion[+arr.questions[arr.current].question] = 0;
    saveOptions.save();
  }
  document.querySelectorAll(".answers__button").forEach((e) => {
    e.style.pointerEvents = "none";
  });
}

export function scoreResult(score) {
  victoryAudio.play();
  document.querySelector(".answer-popup").innerHTML = "";

  const scoreContainer = document.createElement("div");
  const scoreTitle = document.createElement("h2");
  const scoreSubtitle = document.createElement("p");
  const scoreResultP = document.createElement("p");
  const scoreButton = document.createElement("button");

  scoreContainer.classList.add("popup-score");
  scoreTitle.classList.add("popup-score__title");
  scoreSubtitle.classList.add("popup-score__subtitle");
  scoreResultP.classList.add("popup-score__result");
  scoreButton.classList.add("popup-score__button");

  questionsContainer.append(scoreContainer);
  scoreContainer.append(scoreTitle);
  scoreTitle.textContent = "Игра завершена";
  scoreContainer.append(scoreSubtitle);
  scoreSubtitle.textContent = "Ваш результат:";
  scoreContainer.append(scoreResultP);
  scoreResultP.textContent = `${score} / 10`;
  scoreContainer.append(scoreButton);
  scoreButton.textContent = "Продолжить";
  scoreButton.addEventListener("click", () => {
    exitQuestionsToCategories();
  });
}

function nextAnswer(arr) {
  if (arr.current > 8) {
    scoreResult(arr.score);
    document.querySelectorAll(".category-score__result").forEach((e, i) => {
      if (arr.type === i) {
        saveOptions.scoreCategoryAuthors[i] = arr.score;
        saveOptions.save();
        e.textContent = `${arr.score} / 10`;
      }
    });
  } else {
    arr.next();
    getGenerationQuestions(arr);
  }
}
