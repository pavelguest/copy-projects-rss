import { volumeProgress } from "./audioGameSupport";
import { timeGameChecked, timeGameValue } from "./generationAuthors";

const buttonSaveOptions = document.querySelector(".save-settings");
const buttonDefaultOptions = document.querySelector(".default-settings");
const COUNT_CATEGORY = 12;
const COUNT_QUESTIONS = 240;
const IS_TIMER = 1;
const TIMER_DURATION = 5;
const VOLUME_DURATION = 0.75;

export class SaveOptions {
  constructor(timer, timerDuration, volumeDuration) {
    this.timer = timer;
    this.timerDuration = timerDuration;
    this.volumeDuration = volumeDuration;
    this.scoreCategoryAuthors = Array(COUNT_CATEGORY).fill(0);
    this.scoreCategoryPic = Array(COUNT_CATEGORY).fill(0);
    this.rightQuestion = Array(COUNT_QUESTIONS).fill(0);
  }

  save() {
    localStorage.setItem("optionsGame", JSON.stringify(this));
  }

  load() {
    if (localStorage.getItem("optionsGame")) {
      const options = JSON.parse(localStorage.getItem("optionsGame"));

      saveOptions.timer = options.timer;
      this.timerDuration = options.timerDuration;
      this.volumeDuration = options.volumeDuration;
      saveOptions.scoreCategoryAuthors = options.scoreCategoryAuthors;
      saveOptions.scoreCategoryPic = options.scoreCategoryPic;
      saveOptions.rightQuestion = options.rightQuestion;

      timeGameChecked.checked = !!saveOptions.timer;
      timeGameValue.value = this.timerDuration;
      volumeProgress.value = this.volumeDuration;

      const event = new Event("change");
      timeGameChecked.dispatchEvent(event);
      volumeProgress.dispatchEvent(event);
    }
  }

  default() {
    this.timer = IS_TIMER;
    this.timerDuration = TIMER_DURATION;
    this.volumeDuration = VOLUME_DURATION;
    this.save();
    this.load();
  }
}

export const saveOptions = new SaveOptions(IS_TIMER, TIMER_DURATION, VOLUME_DURATION);

buttonSaveOptions.addEventListener("click", () => {
  saveOptions.timer = +timeGameChecked.checked;
  saveOptions.timerDuration = timeGameValue.value;
  saveOptions.volumeDuration = volumeProgress.value;
  saveOptions.save();
});
buttonDefaultOptions.addEventListener("click", () => saveOptions.default());

window.addEventListener("load", saveOptions.load);
