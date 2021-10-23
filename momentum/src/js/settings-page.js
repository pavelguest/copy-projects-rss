const settingsButton = document.querySelector('.settings__button');
const closeButton = document.querySelector('.settings__button-close');
const settingsPopap = document.querySelector('.popap-container');


function open() {
  settingsPopap.classList.add('open');
   settingsPopap.addEventListener('click', function (e) {
     if (!e.target.closest('.settings-container')) {
      settingsPopap.classList.remove('open');
     }
   })
}
function close() {
  settingsPopap.classList.remove('open');
}
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
  'github': 1,
  'unsplash': 1,
  'flickr': 1,
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
  console.log(timeHide.checked)
}

//---------------------------change-image-load----------///
const githubLoad = document.getElementById('github');
const unsplashLoad = document.getElementById('unsplash');
const flickrLoad = document.getElementById('flickr');

function changeLoadImage() {
  if(githubLoad.checked) {
    unsplashLoad.checked = false;
    flickrLoad.checked = false;
  }
  if(unsplashLoad.checked) {
    githubLoad.checked = false;
    flickrLoad.checked = false;
  }
  if(flickrLoad.checked) {
    unsplashLoad.checked = false;
    githubLoad.checked = false;
  }
}

githubLoad.addEventListener('change', changeLoadImage);
unsplashLoad.addEventListener('change', changeLoadImage);
flickrLoad.addEventListener('change', changeLoadImage);

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
window.addEventListener('load', getLocalStor)
timeHide.addEventListener('change', hideElem);
dateHide.addEventListener('change', hideElem);
greetHide.addEventListener('change', hideElem);
quoteHide.addEventListener('change', hideElem);
weatherHide.addEventListener('change', hideElem);
audioHide.addEventListener('change', hideElem);

//-------------------------save-hide--------------------//





