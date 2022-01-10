import { pages } from './Pages';
import { renderGarland } from './RenderGarland';
import { renderSnow } from './RenderSnow';
import { saveSettingsTree } from './DataStorageTree';

class ButtonsTree {
  bgButtons: HTMLElement | null;

  treeButtons: HTMLElement | null;

  audioButton: HTMLElement | null;

  snowButton: HTMLElement | null;

  garlandButtons: HTMLElement | null;

  garlandCheckbox: HTMLElement | null;

  isPlay: boolean;

  audio: HTMLAudioElement | null;

  isSnow: boolean;

  defaultButton: HTMLElement | null;

  constructor() {
    this.bgButtons = document.querySelector('.bg__container');
    this.treeButtons = document.querySelector('.tree__container');
    this.audioButton = document.querySelector('.audio-control');
    this.snowButton = document.querySelector('.snow-control');
    this.garlandButtons = document.querySelector('.garland__buttons');
    this.garlandCheckbox = document.getElementById('garland-input');
    this.isPlay = false;
    this.audio = new Audio();
    this.audio.src = './assets/audio/christmas-trap.mp3';
    this.isSnow = false;
    this.defaultButton = document.querySelector('.controls__default-button');
  }

  stopMusic(): void {
    if (this.audio instanceof HTMLAudioElement) {
      if (this.isPlay) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlay = false;
        (this.audioButton as HTMLElement).classList.remove('active');
      }
    }
  }

  stopSnow(): void {
    if (this.isSnow) {
      this.isSnow = false;
      renderSnow.cancelIntervalSnow();
    }
    (this.snowButton as HTMLElement).classList.remove('active');
  }

  addListener(): void {
    (this.defaultButton as HTMLElement).onclick = () => {
      saveSettingsTree.default();
      saveSettingsTree.save();
    };
    (this.bgButtons as HTMLElement).onclick = (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target !== event.currentTarget
      ) {
        (
          pages.treeContainer as HTMLElement
        ).style.background = `center / cover no-repeat url('./assets/bg/${event.target.dataset.bg}.jpg')`;
        saveSettingsTree.bg = event.target.dataset.bg;
        saveSettingsTree.save();
      }
    };
    (this.treeButtons as HTMLElement).onclick = (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target !== event.currentTarget
      ) {
        (
          pages.treeImg as HTMLImageElement
        ).src = `./assets/tree/${event.target.dataset.tree}.png`;
        saveSettingsTree.tree = event.target.dataset.tree;
        saveSettingsTree.save();
      }
    };
    (this.audioButton as HTMLElement).onclick = (event) => {
      if (event.target instanceof HTMLElement) {
        event.target.classList.toggle('active');
        if (this.isPlay && this.audio) {
          this.audio.pause();
          this.isPlay = false;
        } else {
          (this.audio as HTMLAudioElement).play();
          this.isPlay = true;
        }
        saveSettingsTree.isPlay = this.isPlay;
        saveSettingsTree.save();
      }
    };
    (this.snowButton as HTMLElement).onclick = (event) => {
      if (event.target instanceof HTMLElement) {
        event.target.classList.toggle('active');
        if (this.isSnow) {
          this.isSnow = false;
          renderSnow.cancelIntervalSnow();
        } else {
          this.isSnow = true;
          renderSnow.createSnow();
        }
        saveSettingsTree.isSnow = this.isSnow;
        saveSettingsTree.save();
      }
    };
    (this.garlandCheckbox as HTMLElement).onchange = (event) => {
      if (event.target instanceof HTMLInputElement)
        if (event.target.checked) {
          renderGarland.render(5, 1, 'multicolor', 12);
          renderGarland.render(6, 3, 'multicolor', 11);
          renderGarland.render(9, 5, 'multicolor', 6);
          renderGarland.render(12, 7, 'multicolor', 4.5);
          renderGarland.render(15, 9, 'multicolor', 3.5);
        } else {
          (renderGarland.container as HTMLElement).innerHTML = '';
        }
    };
  }

  setData(): void {
    const saveDataTree = saveSettingsTree.load();

    if (saveDataTree) {
      this.isPlay = saveDataTree.isPlay;
      this.isSnow = saveDataTree.isSnow;
      if (this.isSnow) {
        renderSnow.createSnow();
        (this.snowButton as HTMLElement).classList.add('active');
      }
      if (this.isPlay && this.audio) {
        this.audio.play();
        (this.audioButton as HTMLElement).classList.add('active');
      }
      (
        pages.treeContainer as HTMLElement
      ).style.background = `center / cover no-repeat url('./assets/bg/${saveDataTree.bg}.jpg')`;
      (
        pages.treeImg as HTMLImageElement
      ).src = `./assets/tree/${saveDataTree.tree}.png`;
    }
  }
}

export const buttonsTree = new ButtonsTree();
