import {getQuotes} from './quote.js';
import {getWeather} from './weather.js';
const settingsButton = document.querySelector('.settings__button');
const closeButton = document.querySelector('.settings__button-close');
const settingsPopap = document.querySelector('.popap-container');
const settingsBlock = document.querySelector('.settings-container');


function open() {
  settingsPopap.classList.add('open');

}
function close() {
  settingsPopap.classList.remove('open');
}
window.addEventListener('click', function (e) {
  if (!e.target.closest('.settings-container')) {
    settingsPopap.classList.remove('open');
  }
})
settingsButton.addEventListener('click', open);
closeButton.addEventListener('click', close);



//----------------hide-input--------------//

const timeHide = document.getElementById('time');
const dateHide = document.getElementById('date');
const greetHide = document.getElementById('greet');
const quoteHide = document.getElementById('quote');
const weatherHide = document.getElementById('weather');
const audioHide = document.getElementById('audio');
const checkBoxAll = document.querySelectorAll('.check');


//---------------hide-block----------------//


export var settingsObject = {
  'time': 1,
  'date': 1,
  'greet': 1,
  'quote': 1,
  'weather': 1,
  'audio': 1,

}


function hideElem() {
  if(!timeHide.checked) {
    document.querySelector('.time').classList.add('input-hidden');
    settingsObject.time = 0;
  } else {
    document.querySelector('.time').classList.remove('input-hidden');
    settingsObject.time = 1;
  }
  if(!dateHide.checked) {
    document.querySelector('.date').classList.add('input-hidden');
    settingsObject.date = 0;
  } else {
    document.querySelector('.date').classList.remove('input-hidden');
    settingsObject.date = 1;
  }
  if(!greetHide.checked) {
    document.querySelector('.greeting-container').classList.add('input-hidden');
    settingsObject.greet = 0;
  } else {
    document.querySelector('.greeting-container').classList.remove('input-hidden');
    settingsObject.greet = 1;
  }
  if(!quoteHide.checked) {
    document.querySelector('.footer').classList.add('input-hidden');
    settingsObject.quote = 0;
  } else {
    document.querySelector('.footer').classList.remove('input-hidden');
    settingsObject.quote = 1;
  }
  if(!weatherHide.checked) {
    document.querySelector('.weather').classList.add('input-hidden');
    settingsObject.weather = 0;
  } else {
    document.querySelector('.weather').classList.remove('input-hidden');
    settingsObject.weather = 1;
  }
  if(!audioHide.checked) {
    document.querySelector('.player').classList.add('input-hidden');
    settingsObject.audio = 0;
  } else {
    document.querySelector('.player').classList.remove('input-hidden');
    settingsObject.audio = 1;
  }
  localStorage.setItem('settings', JSON.stringify(settingsObject));
}

//-------------------------save-hide--------------------//

function getLocalStor() {
  if(localStorage.getItem('settings')) {
    settingsObject = JSON.parse(localStorage.getItem('settings'));
    console.log(settingsObject)
    document.querySelector('.time').classList.add('animation-transition');
    if(timeHide.checked && settingsObject.time === 0) timeHide.checked = false;
    if(dateHide.checked && settingsObject.date === 0) dateHide.checked = false;
    if(greetHide.checked && settingsObject.greet === 0) greetHide.checked = false;
    if(quoteHide.checked && settingsObject.quote === 0) quoteHide.checked = false;
    if(weatherHide.checked && settingsObject.weather === 0) weatherHide.checked = false;
    if(audioHide.checked && settingsObject.audio === 0) audioHide.checked = false;

    hideElem()
  }
}
window.addEventListener('load', getLocalStor);
timeHide.addEventListener('change', hideElem);
dateHide.addEventListener('change', hideElem);
greetHide.addEventListener('change', hideElem);
quoteHide.addEventListener('change', hideElem);
weatherHide.addEventListener('change', hideElem);
audioHide.addEventListener('change', hideElem);


//------------------------------function-change-lang-----------//

export const langEn = document.getElementById('en');
const langRu = document.getElementById('ru');
const langAll = document.querySelectorAll('.check-lang');

function changeLangSettings() {
  if(localStorage.lang === 'en' || langEn.checked) {
    document.querySelector('.settings__button').textContent = 'Settings';
    document.querySelector('.settings__title').textContent = 'Settings';
    document.querySelector('.subtitle-one').textContent = 'language';
    document.querySelector('.subtitle-two').textContent = 'image';
    document.querySelector('.subtitle-three').textContent = 'hide elements';
    document.querySelector('.time-ru').textContent = 'Time';
    document.querySelector('.date-ru').textContent = 'Date';
    document.querySelector('.greet-ru').textContent = 'Greeting';
    document.querySelector('.quote-ru').textContent = 'Quote';
    document.querySelector('.weather-ru').textContent = 'Weather';
    document.querySelector('.audio-ru').textContent = 'Audio player';
    document.querySelector('.en-ru').textContent = 'English';
    document.querySelector('.rus-en').textContent = 'Russian';
  } else {
    document.querySelector('.settings__button').textContent = 'Настройки';
    document.querySelector('.settings__title').textContent = 'Настройки';
    document.querySelector('.subtitle-one').textContent = 'язык';
    document.querySelector('.subtitle-two').textContent = 'изображение';
    document.querySelector('.subtitle-three').textContent = 'спрятать блок';
    document.querySelector('.time-ru').textContent = 'Время';
    document.querySelector('.date-ru').textContent = 'Дата';
    document.querySelector('.greet-ru').textContent = 'Приветствие';
    document.querySelector('.quote-ru').textContent = 'Цитаты';
    document.querySelector('.weather-ru').textContent = 'Погода';
    document.querySelector('.audio-ru').textContent = 'Аудио плеер';
    document.querySelector('.en-ru').textContent = 'Английский';
    document.querySelector('.rus-en').textContent = 'Русский';
  }
}
langAll.forEach(el => {
  if (localStorage.getItem(el.name) == el.value)
  el.checked = true;
  el.addEventListener("change", el => {
    localStorage.setItem(el.path[0].name, el.path[0].value);
    getQuotes();
    getWeather();
    changeLangSettings();
  });
});

changeLangSettings()


