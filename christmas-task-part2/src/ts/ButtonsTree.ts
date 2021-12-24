import { pages } from "./Pages";
import { renderSnow } from "./RenderSnow";

class ButtonsTree {
  bgButtons: HTMLElement | null;
  treeButtons: HTMLElement | null;
  audioButton: HTMLElement | null;
  snowButton: HTMLElement | null;
  isPlay: boolean;
  audio: HTMLAudioElement | null;
  isSnow: boolean;

  constructor() {
    this.bgButtons = document.querySelector('.bg__container');
    this.treeButtons = document.querySelector('.tree__container');
    this.audioButton = document.querySelector('.audio-control');
    this.snowButton = document.querySelector('.snow-control');
    this.isPlay = false;
    this.audio = new Audio();
    this.audio.src = `../assets/audio/christmas-trap.mp3`;
    this.isSnow = false;

  }
  addListener() {
    this.bgButtons!.onclick = (event) => {
      if(event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        pages.treeContainer!.style.background = `center / cover no-repeat url('./../assets/bg/${event.target.dataset.bg}.jpg')`;
      }
    }
    this.treeButtons!.onclick = (event) => {
      if(event.target instanceof HTMLElement && event.target !== event.currentTarget) {
        pages.treeImg!.src = `./assets/tree/${event.target.dataset.tree}.png`;
      }
    }
    this.audioButton!.onclick = (event) => {
      if(event.target instanceof HTMLElement) {
        event.target!.classList.toggle('active');
        if(this.isPlay) {
          this.audio!.pause();
          this.isPlay = false;
        } else {
          this.audio!.play();
          this.isPlay = true;
        }
      }
    }
    this.snowButton!.onclick = (event) => {
      if(event.target instanceof HTMLElement) {
        event.target!.classList.toggle('active');
        if(this.isSnow) {
          this.isSnow = false;
          renderSnow.cancelIntervalSnow();
        } else {
          this.isSnow = true;
          renderSnow.createSnow();
        }
      }
    }
  }
}

export const buttonsTree = new ButtonsTree();
buttonsTree.addListener();
