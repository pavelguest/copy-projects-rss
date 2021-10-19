const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  console.log(hours);
  if (hours >= 6 && hours < 12) greeting.textContent = `Good morning,`;
  if (hours >= 12 && hours < 18) greeting.textContent = `Good afternoon,`;
  if (hours >= 18 && hours < 0) greeting.textContent = `Good evening,`;
  if (hours >= 0 && hours < 6) greeting.textContent = `Good night,`;
}

getTimeOfDay()

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)
