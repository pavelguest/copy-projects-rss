const panel = document.querySelector('.panel');
const toggle = panel.querySelector('.toggle');
const toggleLarge = document.querySelector('.player__play-large');
const progress = document.querySelector('.progress');
const progressVol = document.querySelector('.progress-vol');




/*let active = 0;
addActiveV();
nextButton.addEventListener('click', () => {
  removeActiveV();
  active++;
  toggleLarge.style.display = 'block';
  if (active > slidesV.length - 1) active = 0;
  addActiveV();
});
backButton.addEventListener('click', () => {
  removeActiveV();
  active--;
  if (active < 0) active = slidesV.length - 1;
  addActiveV();
});
function addActiveV() {
  slidesV[active].classList.add('active');
  slidesV[active].addEventListener('click', togglePlay);
  add(slidesV[active]);
};
function removeActiveV() {
  slidesV[active].pause();
  slidesV[active].currentTime = 0;
  toggleLarge.style.display = 'block';
  progressVideoTime();
  remove(slidesV[active]);
 // slidesV.forEach((slide) => slide.classList.remove('active'));
};

function add (video) {
  toggle.addEventListener('click', togglePlay);
  toggleLarge.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
};
function remove (video) {
  toggle.removeEventListener('click', togglePlay);
  toggleLarge.removeEventListener('click', togglePlay);
  video.removeEventListener('click', togglePlay);
};
function togglePlay() {
  if (slidesV[active].paused) {
    toggle.setAttribute('class', 'panel__play');
    toggleLarge.style.display = 'none';
    slidesV[active].play();
  } else {
    toggle.setAttribute('class', 'panel__pause');
    toggleLarge.style.display = 'block';
    slidesV[active].pause();
  }
};
function change() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
}
progress.addEventListener('input', change);
progressVol.addEventListener('input', change);

/*const body = document.body;
const progressBar = panel.querySelector('.panel__progress-video');
const skipButtons = panel.querySelectorAll('[data-skip]');
const rangesVolume = panel.querySelectorAll('.panel__progress-volume');
const fullscreen = panel.querySelector('.fullscreen');
const muteVol = panel.querySelector('.mute-volume');







nextButton.addEventListener('click', () => {
  removeActive();
  active++;
  toggleLarge.style.display = 'block';
  if (active > slides.length - 1) active = 0;
  addActive();
});
backButton.addEventListener('click', () => {
  removeActive();
  active--;
  if (active < 0) active = slides.length - 1;
  addActive();
});
function addActive() {
  slides[active].classList.add('active');
  slides[active].addEventListener('click', togglePlay);
  add(slides[active]);
  body.style.backgroundColor = slides[active].style.backgroundColor;
};
function removeActive() {
  slides[active].pause();
  slides[active].currentTime = 0;
  progressVideoTime();
  remove(slides[active]);
  slides.forEach((slide) => slide.classList.remove('active'));
};
function togglePlay() {
  if (slides[active].paused) {
    toggle.setAttribute('class', 'panel__play');
    toggleLarge.style.display = 'none';
    slides[active].play();
  } else {
    toggle.setAttribute('class', 'panel__pause');
    toggleLarge.style.display = 'block';
    slides[active].pause();
  }
};
function handleRangeUpdate() {
  slides[active][this.name] = this.value;
  const value = (this.value - this.min)/(this.max - this.min) * 100;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
};
function progressVideo(e) {
  slides[active].currentTime = (e.offsetX / progressBar.offsetWidth) * slides[active].duration;
};
function progressVideoTime() {
  const value = (slides[active].currentTime / slides[active].duration) * 100;
  progressBar.value = value;
  progressBar.style.background = `linear-gradient( to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
};
function videoMute() {
  if (slides[active].muted) {
    slides[active].muted = false;
    muteVol.setAttribute('class', 'panel__volume');
  } else {
    muteVol.setAttribute('class', 'panel__unmute');
    slides[active].muted = true;
  }
};
function toggleFullscreen() {
  if (document.fullscreenElement === null) {
    slider.classList.add('fullscreen-window');
    slider.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      slider.classList.remove('fullscreen-window');
      document.exitFullscreen();
    }
  }
};
function keysPush(e) {
  switch (e.keyCode) {
    case 32:
      togglePlay();
      break;
    case 77:
      videoMute();
      break;
    case 70:
      toggleFullscreen();
      break;
    case 39:
      slides[active].currentTime += 5;
      break;
    case 37:
      slides[active].currentTime -= 5;
      break;
  }
};
function add (video) {
  toggle.addEventListener('click', togglePlay);
  toggleLarge.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  video.addEventListener('timeupdate', progressVideoTime);
  rangesVolume.forEach(range => range.addEventListener('change', handleRangeUpdate));
  rangesVolume.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
  progressBar.addEventListener('click', progressVideo);
  progressBar.addEventListener('input', progressVideoTime);
  fullscreen.addEventListener('click', toggleFullscreen);
  muteVol.addEventListener('click', videoMute);
};
function remove (video) {
  toggle.removeEventListener('click', togglePlay);
  toggleLarge.removeEventListener('click', togglePlay);
  video.removeEventListener('click', togglePlay);
  video.removeEventListener('timeupdate', progressVideoTime);
  rangesVolume.forEach(range => range.removeEventListener('change', handleRangeUpdate));
  rangesVolume.forEach(range => range.removeEventListener('mousemove', handleRangeUpdate));
  progressBar.removeEventListener('click', progressVideo);
  progressBar.removeEventListener('input', progressVideoTime);
  fullscreen.removeEventListener('click', toggleFullscreen);
  muteVol.removeEventListener('click', videoMute);
};

window.addEventListener('keydown', keysPush);
*/
