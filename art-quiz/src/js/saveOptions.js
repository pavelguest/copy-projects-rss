import { volumeProgress } from "./audioGameSupport";
import { timeGameChecked, timeGameValue } from "./generationAuthors";

const buttonSaveOptions = document.querySelector('.save-settings');
const buttonDefaultOptions = document.querySelector('.default-settings');


export class SaveOptions {
  constructor(timer, timerDuration, volumeDuration) {
    this.timer = timer;
    this.timerDuration = timerDuration;
    this.volumeDuration = volumeDuration;
  }
  save() {
    localStorage.setItem('optionsGame', JSON.stringify(this));
    console.log(this);
  }
  load() {
    if(localStorage.getItem('optionsGame')) {
      let options = JSON.parse(localStorage.getItem('optionsGame'));

      this.timer = options.timer;
      this.timerDuration = options.timerDuration;
      this.volumeDuration = options.volumeDuration;

      timeGameChecked.checked = !!this.timer;
      timeGameValue.value = this.timerDuration;
      volumeProgress.value = this.volumeDuration;

      let event = new Event('change');
      timeGameChecked.dispatchEvent(event);
      volumeProgress.dispatchEvent(event);
    }
  }
  default() {
    this.timer = 1;
    this.timerDuration = 5;
    this.volumeDuration = 0.75;
    this.save();
    this.load();
  }
}

export let saveOptions = new SaveOptions(1, 5, 0.75);
console.log(saveOptions)
window.addEventListener('load', saveOptions.load);

buttonSaveOptions.addEventListener('click', () => {
  saveOptions.timer = +timeGameChecked.checked;
  saveOptions.timerDuration = timeGameValue.value;
  saveOptions.volumeDuration = volumeProgress.value;
  saveOptions.save()
});
buttonDefaultOptions.addEventListener('click', () => saveOptions.default())
