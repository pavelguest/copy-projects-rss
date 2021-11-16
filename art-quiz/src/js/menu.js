import { timeGameChecked, timeGameValue } from "./generationAuthors";

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

function saveSettings() {
  localStorage.setItem('timeInterval', timeGameValue.value);

}
function loadSettings() {
  if(localStorage.getItem('timeInterval')) {
    timeGameValue.value = localStorage.getItem('timeInterval');
  }
  if(localStorage.getItem('checkedTimer')) {
    let valueChecked = localStorage.getItem('checkedTimer');
    console.log(localStorage.getItem('checkedTimer'))
    // if(valueChecked == 1) {
    //   timeGameChecked.checked = true;
    // } else if (valueChecked == 0) {
    //   timeGameChecked.checked = false;
    // }
  }
}
openSettingsMenu.addEventListener('click', openSettings);
backSettingsMenu.addEventListener('click', closeSettings);
closeSettingsMenu.addEventListener('click', closeSettings);


window.addEventListener('beforeunload', saveSettings);
window.addEventListener('load', loadSettings);
