import playList from './play-list.js';

const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const audioPlayer = document.querySelector('.audio-player');
const nameAudio = audioPlayer.querySelector('.name-audio');
const progressBar = audioPlayer.querySelector('.progress-audio');
const progressVolume = audioPlayer.querySelector('.progress-vol');
const muteVol = audioPlayer.querySelector('.volume');
const listAudio = document.querySelectorAll('.play-item');
const listAudioSpan = document.querySelectorAll('.span-svg');

let isPlay = false;
let playNum = 0;

const audio = new Audio();
audio.src = playList[playNum].src;

function playAudio() {
  nameAudio.textContent = playList[playNum].title;
  if(!isPlay) {
    audio.play();
    isPlay = true;
    play.classList.add('pause')
    listAudioSpan[playNum].classList.add('item-active');
  } else {
    audio.pause();
    isPlay = false;
    play.classList.remove('pause')
    listAudioSpan[playNum].classList.remove('item-active')
  }
}

function playNextAudio() {
  listAudioSpan[playNum].classList.remove('item-active')
  playNum++
  isPlay = false;
  audio.currentTime = 0;
  if (playNum > 3) playNum = 0;
  audio.src = playList[playNum].src;
  playAudio();
}
function playPrevAudio() {
  listAudioSpan[playNum].classList.remove('item-active')
  playNum--
  isPlay = false;
  audio.currentTime = 0;
  if (playNum < 0) playNum = 3;
  audio.src = playList[playNum].src;
  playAudio();
}

function progressAudio(e) {
  audio.currentTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
};
function progressAudioTime() {
  let value;
  if(audio.duration) {
    value = (audio.currentTime / audio.duration) * 100;
  } else value = 0;
  progressBar.value = value;
  progressBar.style.background = `linear-gradient( to right, rgb(180, 56, 164) 0%, rgb(180, 56, 164) ${value}%, #fff ${value}%, #fff 100%)`;
};
function progressAudioVolume() {
  if (audio.muted) {
    audio.muted = false;
    audio.volume = progressVolume.value;
  }
  audio[this.name] = this.value;
  const value = (this.value - this.min)/(this.max - this.min) * 100;
  this.style.background = `linear-gradient(to right, rgb(180, 56, 164) 0%, rgb(180, 56, 164) ${value}%, #fff ${value}%, #fff 100%)`;
  if (audio.volume === 0) {
  muteVol.classList.add('mute');
  } else muteVol.classList.remove('mute');
};

function audioMute() {
  if (audio.muted) {
    audio.muted = false;
    muteVol.classList.remove('mute');
    progressVolume.value = audio.volume;
  } else {
    muteVol.classList.add('mute');
    audio.muted = true;
    progressVolume.value = 0;
  }
  progressVolume.style.background = `linear-gradient(to right, rgb(180, 56, 164) 0%, rgb(180, 56, 164) ${progressVolume.value * 100}%, #fff ${progressVolume.value * 100}%, #fff 100%)`;
};
//---------------------------------//
audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".length").textContent = getTimeCode(
      audio.duration
    );
    audio.volume = .75;
  },
  false
);

setInterval(() => {
  audioPlayer.querySelector(".current").textContent = getTimeCode(audio.currentTime);
}, 500);

function getTimeCode(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
//---------------------------------------------------//

listAudioSpan.forEach((elem, index) => {
  playNum = index;
  elem.addEventListener('click', playAudio);
  });


play.addEventListener('click', playAudio);
playPrev.addEventListener('click', playPrevAudio);
playNext.addEventListener('click', playNextAudio);
audio.addEventListener('timeupdate', progressAudioTime);
progressBar.addEventListener('click', progressAudio);
progressBar.addEventListener('input', progressAudioTime);
progressVolume.addEventListener('change', progressAudioVolume);
progressVolume.addEventListener('mousemove', progressAudioVolume);
muteVol.addEventListener('click', audioMute);


