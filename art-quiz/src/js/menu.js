import { settingsTimeButtonsContainer, timeGameChecked, timerContainer } from "./generationAuthors";
import { saveOptions } from "./saveOptions";

export const openSettingsMenu = document.querySelector('.main-menu__settings-ico');
export const backSettingsMenu = document.querySelector('.settings-menu__ico-back');
export const closeSettingsMenu = document.querySelector('.settings-menu__ico-close');
export const mainMenu = document.querySelector('.main-menu');
export const settingsMenu = document.querySelector('.settings-menu');


function openSettings() {
  mainMenu.style.display = 'none';
  settingsMenu.style.display = 'flex';
}

function closeSettings() {
  mainMenu.style.display = 'flex';
  settingsMenu.style.display = 'none';
}

export function timerQuestions(progressTime, progressBar, time) {
  console.log(saveOptions.timer)
  if(saveOptions.timer === 0) {
    console.log('lol')
    return;
  } else {
    let start = 100;
    let interval = Math.round(100/time);
    let intervalId = setInterval(() => {
      if(start < 0) {
      clearInterval(intervalId)
      progressBar.value = 0;
      let event = new Event('change');
      progressBar.dispatchEvent(event);
      } else {
        progressTime.textContent = `${time}`;
        progressBar.value = start;
      }
      start = start - interval;
      time--;
    }, 1000)
    return () => {
      clearInterval(intervalId);
    }
  }
}

function changeSettingsTimer() {
  if(timeGameChecked.checked == true) {
    settingsTimeButtonsContainer.style.opacity = '1';
    timerContainer.style.opacity = '1';
  } else {
    timerContainer.style.opacity = '0';
    settingsTimeButtonsContainer.style.opacity = '0';
  }
}

timeGameChecked.addEventListener('change', changeSettingsTimer)

openSettingsMenu.addEventListener('click', openSettings);
backSettingsMenu.addEventListener('click', closeSettings);
closeSettingsMenu.addEventListener('click', closeSettings);
