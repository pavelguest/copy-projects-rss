class Buttons {
  nextList: HTMLElement | null;
  prevList: HTMLElement | null;
  constructor() {
    this.nextList = document.getElementById('next-list');
    this.prevList = document.getElementById('prev-list');
  }
}

export default Buttons;
