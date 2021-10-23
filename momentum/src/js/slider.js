import * as partDays from './clock.js';
import {changeImageOne} from './background.js';

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
  let bgNum = randomNum.toString().padStart(2, '0');
  console.log(timeOfDay)
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

//setBg()


async function getLinkImageOne() {
  let timeOfDay = partDays.getTimeOfDay().toLowerCase();
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=846f232a2c5c36b7a40019edc7e16b9a&tags=${timeOfDay}&extras=url_h&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  let bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = data.photos.photo[+bgNum].url_h;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
 }
//getLinkImageOne()

async function getLinkImageTwo() {
  let timeOfDay = partDays.getTimeOfDay().toLowerCase();
  const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=7SUGVyUFe1HAx-0rAYbM6j1h70uybDnLqEwiKxhCT48`;
  const res = await fetch(url);
  const data = await res.json();
  let bgNum = randomNum.toString().padStart(2, '0');
  console.log(data.urls.regular)
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
 }
//getLinkImageTwo()

function getSlideNext() {
  randomNum += 1;
  if(randomNum > 20) randomNum = 1;
  //setBg()
  //getLinkImageOne()
  //getLinkImageTwo()
  console.log(randomNum)
}
function getSlidePrev() {
  randomNum -= 1;
  if(randomNum < 1) randomNum = 20;
  //setBg()
  //getLinkImageOne()
  //getLinkImageTwo()
  console.log(randomNum)
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
