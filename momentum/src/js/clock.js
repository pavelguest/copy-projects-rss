
const timeNow = document.querySelector('.time');
const dateNow = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameNow = document.querySelector('.name');

let partDay;

function showTime() {
  const time = new Date();
  const currentTime = time.toLocaleTimeString();
  timeNow.textContent = currentTime;
  showDate();
  getTimeOfDay();
  setTimeout(showTime, 1000);
}

function showDate() {
  const date = new Date();
  const options = {weekday:'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  dateNow.textContent = currentDate;
}

export function getTimeOfDay() {
  const time = new Date();
  const hours = time.getHours();

  if (hours >= 6 && hours < 12) {
    partDay = 'Morning';
  } else if (hours >= 12 && hours < 18) {
    partDay = 'Afternoon';
  } else if (hours >= 18 && hours < 24) {
    partDay = 'Evening';
  } else {
    partDay = 'Night';
  }

  greeting.textContent = `Good ${partDay}`
  return partDay;
}

function setLocalStorage() {
  localStorage.setItem('name', nameNow.value);
}

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    nameNow.value = localStorage.getItem('name');
  }
}

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)




showTime();
