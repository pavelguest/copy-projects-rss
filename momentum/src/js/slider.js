
const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomNum = getRandomNum(1, 20);
let part;
export function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function partDaysImport() {
  const time = new Date();
  const hours = time.getHours();
  if (hours >= 6 && hours < 12) {
    part = 'Morning';
  } else if (hours >= 12 && hours < 18) {
    part = 'Afternoon';
  } else if (hours >= 18 && hours < 24) {
    part = 'Evening';
  } else {
    part = 'Night';
  }
};
function setBg() {
  partDaysImport()
  let timeOfDay = part.toLowerCase();
  let bgNum = randomNum.toString().padStart(2, '0');
  console.log(timeOfDay)
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

async function getLinkImageOne() {
  partDaysImport()
  let timeOfDay = part.toLowerCase();
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

async function getLinkImageTwo() {
  partDaysImport()
  let timeOfDay = part.toLowerCase();
  const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=7SUGVyUFe1HAx-0rAYbM6j1h70uybDnLqEwiKxhCT48`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.urls.regular)
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
 }

function getSlideNext() {
  randomNum += 1;
  if(randomNum > 20) randomNum = 1;
  getLoadTypeImage()
  console.log(randomNum)
}
function getSlidePrev() {
  randomNum -= 1;
  if(randomNum < 1) randomNum = 20;
  getLoadTypeImage()
  console.log(randomNum)
}

const imageLoadType = document.querySelectorAll('.check');
const githubLoad = document.getElementById('github');
const unsplashLoad = document.getElementById('unsplash');
const flickrLoad = document.getElementById('flickr');

function getLoadTypeImage() {
  if(githubLoad.checked) {
    setBg()
  } else if(unsplashLoad.checked) {
    getLinkImageTwo()
  } else {
    getLinkImageOne()
  }
}

githubLoad.addEventListener('click', getLoadTypeImage);
unsplashLoad.addEventListener('click', getLoadTypeImage);
flickrLoad.addEventListener('click', getLoadTypeImage);
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
imageLoadType.forEach(e => {
  if (localStorage.getItem(e.name) == e.value)
  e.checked = true;
  e.addEventListener("change", e => {
    localStorage.setItem(e.path[0].name, e.path[0].value);
  });
});
getLoadTypeImage()
