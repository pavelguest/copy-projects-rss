export const rightAudio = new Audio();
rightAudio.preload = "audio";
rightAudio.src = "./assets/audio/right.mp3";

export const wrongAudio = new Audio();
wrongAudio.preload = "audio";
wrongAudio.src = "./assets/audio/wrong.mp3";

export const victoryAudio = new Audio();
victoryAudio.preload = "audio";
victoryAudio.src = "./assets/audio/victory.mp3";

export const volumeProgress = document.querySelector(".volume__progress");
const volumeButtonMute = document.querySelector(".volume__mute");
const audioArr = [rightAudio, wrongAudio, victoryAudio];

function getAudioVolume() {
  audioArr.forEach((e) => {
    if (e.muted) {
      e.muted = false;
      e.volume = volumeProgress.value;
    }
    e[this.name] = this.value;
    const value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background = `linear-gradient(to right, rgb(137, 178, 212) 0%, rgb(137, 178, 212) ${value}%, #fff ${value}%, #fff 100%)`;
    if (e.volume === 0) {
      volumeButtonMute.classList.add("mute");
    } else volumeButtonMute.classList.remove("mute");
  });
}
function audioMute() {
  audioArr.forEach((e) => {
    if (e.muted) {
      e.muted = false;
      volumeButtonMute.classList.remove("mute");
      volumeProgress.value = e.volume;
    } else {
      volumeButtonMute.classList.add("mute");
      e.muted = true;
      volumeProgress.value = 0;
    }
    volumeProgress.style.background = `linear-gradient(to right, rgb(137, 178, 212) 0%, rgb(137, 178, 212) ${
      volumeProgress.value * 100
    }%, #fff ${volumeProgress.value * 100}%, #fff 100%)`;
  });
}

volumeProgress.addEventListener("change", getAudioVolume);
volumeProgress.addEventListener("mousemove", getAudioVolume);
volumeProgress.addEventListener("touchmove", getAudioVolume);
volumeButtonMute.addEventListener("click", audioMute);
