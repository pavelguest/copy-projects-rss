import { settingsTimeButtonsContainer, timeGameChecked, timerContainer } from "./generationAuthors";
import { saveOptions } from "./saveOptions";

export const openSettingsMenu = document.querySelector(".main-menu__settings-ico");
export const backSettingsMenu = document.querySelector(".settings-menu__ico-back");
export const closeSettingsMenu = document.querySelector(".settings-menu__ico-close");
export const mainMenu = document.querySelector(".main-menu");
export const settingsMenu = document.querySelector(".settings-menu");
export const footerContainer = document.querySelector(".footer-container");

function openSettings() {
  mainMenu.classList.add("pt-page-rotatePushBottom");
  settingsMenu.classList.add("pt-page-ontop");
  settingsMenu.classList.add("pt-page-current");
  settingsMenu.classList.add("pt-page-rotatePushTop");
  window.setTimeout(() => {
    mainMenu.classList.remove("pt-page-current");
    settingsMenu.classList.remove("pt-page-ontop");
    settingsMenu.classList.remove("pt-page-rotatePushTop");
    mainMenu.classList.remove("pt-page-rotatePushBottom");
  }, 1000);
}

function closeSettings() {
  settingsMenu.classList.add("pt-page-rotatePushBottom");
  mainMenu.classList.add("pt-page-ontop");
  mainMenu.classList.add("pt-page-current");
  mainMenu.classList.add("pt-page-rotatePushTop");
  window.setTimeout(() => {
    settingsMenu.classList.remove("pt-page-current");
    mainMenu.classList.remove("pt-page-ontop");
    mainMenu.classList.remove("pt-page-rotatePushTop");
    settingsMenu.classList.remove("pt-page-rotatePushBottom");
  }, 1000);
}

export function timerQuestions(progressTime, progressBar, time) {
  if (!saveOptions.timer) return;
  let start = 100;
  const interval = Math.round(100 / time);
  const intervalId = setInterval(() => {
    if (start < 0) {
      clearInterval(intervalId);
      progressBar.value = 0;
      const event = new Event("change");
      progressBar.dispatchEvent(event);
    } else {
      progressTime.textContent = `${time}`;
      progressBar.value = start;
    }
    start -= interval;
    time -= 1;
  }, 1000);
  return () => {
    clearInterval(intervalId);
  };
}

function changeSettingsTimer() {
  if (timeGameChecked.checked === true) {
    settingsTimeButtonsContainer.style.opacity = "1";
    timerContainer.style.opacity = "1";
  } else {
    timerContainer.style.opacity = "0";
    settingsTimeButtonsContainer.style.opacity = "0";
  }
}

timeGameChecked.addEventListener("change", changeSettingsTimer);

openSettingsMenu.addEventListener("click", openSettings);
backSettingsMenu.addEventListener("click", closeSettings);
closeSettingsMenu.addEventListener("click", closeSettings);
