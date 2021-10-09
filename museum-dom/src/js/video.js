const videoPlay = document.querySelector('.v-slide')
const videoContainer = document.querySelector('.v-slider');
const videoFull = document.querySelector('.video-content');
const videoAlert = document.querySelector('.video-alert');
const panel = document.querySelector('.panel');
const toggle = panel.querySelector('.toggle');
const toggleLarge = document.querySelector('.player__play-large');
const progressBar = panel.querySelector('.progress');
const progressVolume = panel.querySelector('.progress-vol');
const rangesVolume = panel.querySelectorAll('.panel__progress-volume');
const fullscreen = panel.querySelector('.fullscreen');
const muteVol = panel.querySelector('.mute-volume');

videoPlay.volume = 0.45;
videoPlay.onended = function() {
  toggle.setAttribute('class', 'panel__play');
    toggleLarge.style.display = 'block';
}
function togglePlay() {
  if (videoPlay.paused) {
    toggle.setAttribute('class', 'panel__pause');
    toggleLarge.style.display = 'none';
    videoPlay.play();
  } else {
    toggle.setAttribute('class', 'panel__play');
    toggleLarge.style.display = 'block';
    videoPlay.pause();
  }
};

function progressVideo(e) {
  videoPlay.currentTime = (e.offsetX / progressBar.offsetWidth) * videoPlay.duration;
};
function progressVideoTime() {
  const value = (videoPlay.currentTime / videoPlay.duration) * 100;
  progressBar.value = value;
  progressBar.style.background = `linear-gradient( to right, #710707 0%, #710707 ${value}%, #fff ${value}%, #fff 100%)`;
};
function handleRangeUpdate() {
  if (videoPlay.muted) {
    videoPlay.muted = false;
    videoPlay.volume = progressVolume.value;
  }
  videoPlay[this.name] = this.value;
  const value = (this.value - this.min)/(this.max - this.min) * 100;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, #fff 100%)`;
  if (videoPlay.volume === 0) {
    muteVol.setAttribute('class', 'panel__unmute');
  } else muteVol.setAttribute('class', 'panel__volume');
};
function videoMute() {
  if (videoPlay.muted) {
    videoPlay.muted = false;
    muteVol.setAttribute('class', 'panel__volume');
    progressVolume.value = videoPlay.volume;
  } else {
    muteVol.setAttribute('class', 'panel__unmute');
    videoPlay.muted = true;
    progressVolume.value = 0;
  }
  progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVolume.value * 100}%, #fff ${progressVolume.value * 100}%, #fff 100%)`;
};

function toggleFullscreen() {
  if (document.fullscreenElement === null) {
    videoFull.classList.add('fullscreen-window');
    videoContainer.classList.add('fullscreen-window');
    videoFull.requestFullscreen();
    fullscreen.setAttribute('class', 'panel__fullscreen-exit');
  } else {
    if (document.fullscreenEnabled) {
      videoFull.classList.remove('fullscreen-window');
      videoContainer.classList.remove('fullscreen-window');
      document.exitFullscreen();
      fullscreen.setAttribute('class', 'panel__fullscreen');
    }
  }
};
function keysPush(e) {
  switch (e.keyCode) {
    case 32:
      e.preventDefault();
      togglePlay();
      break;
    case 77:
      videoMute();
      break;
    case 70:
      toggleFullscreen();
      break;
    case 39:
      videoPlay.currentTime += 5;
      break;
    case 37:
      videoPlay.currentTime -= 5;
      break;
    case 188:
      if (e.shiftKey)
        videoPlay.playbackRate -= 0.25;
        videoAlert.style.opacity = '1'
        videoAlert.textContent = `${videoPlay.playbackRate}x`;
        setTimeout(() => {videoAlert.style.opacity = '0'}, 700);
      break;
    case 190:
      if (e.shiftKey)
        videoPlay.playbackRate += 0.25;
        videoAlert.style.opacity = '1'
        videoAlert.textContent = `${videoPlay.playbackRate}x`;
        setTimeout(() => {videoAlert.style.opacity = '0'}, 700);
      break;
  }
};

toggle.addEventListener('click', togglePlay);
toggleLarge.addEventListener('click', togglePlay);
videoPlay.addEventListener('click', togglePlay);
videoPlay.addEventListener('timeupdate', progressVideoTime);
rangesVolume.forEach(range => range.addEventListener('change', handleRangeUpdate));
rangesVolume.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progressBar.addEventListener('click', progressVideo);
progressBar.addEventListener('input', progressVideoTime);
fullscreen.addEventListener('click', toggleFullscreen);
muteVol.addEventListener('click', videoMute);
window.addEventListener('keydown', keysPush);
