import * as partDays from './clock.js';

const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomNum = getRandomNum(1, 20);

export function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
  let timeOfDay = partDays.getTimeOfDay().toLowerCase();
  let bgNum = randomNum.toString().padStart(2, '0');;
  console.log(timeOfDay)
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

setBg()

function getSlideNext() {
  randomNum += 1;
  if(randomNum > 20) randomNum = 1;
  setBg()
  console.log(randomNum)
}
function getSlidePrev() {
  randomNum -= 1;
  if(randomNum < 1) randomNum = 20;
  setBg()
  console.log(randomNum)
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
