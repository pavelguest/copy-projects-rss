import playList from './play-list.js';

const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

let isPlay = false;
let playNum = 0;

const audio = new Audio();

function playAudio() {
  audio.src = playList[playNum].src;
  if(!isPlay) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    play.classList.add('pause')
  } else {
    audio.pause();
    isPlay = false;
    play.classList.remove('pause')
  }
}

function playPrevAudio() {
  playNum += 1;
  isPlay = false;
  if (playNum > 3) playNum = 0;
  playAudio();
}
function playNextAudio() {
  playNum -= 1;
  isPlay = false;
  if (playNum < 0) playNum = 3;
  playAudio();
}

playList.forEach(e => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = e.title;
  playListContainer.append(li);
});

play.addEventListener('click', playAudio);
playPrev.addEventListener('click', playPrevAudio);
playNext.addEventListener('click', playNextAudio);


