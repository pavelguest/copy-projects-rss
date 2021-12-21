import { pages } from "./Pages";

class ButtonsNav {
  startGame: HTMLElement | null;

  toMainPage: HTMLElement | null;

  toDecorPage: HTMLElement | null;

  toTreePage: HTMLElement | null;

  constructor() {
    this.startGame = document.querySelector('.main__button');
    this.toMainPage = document.querySelector('.header-nav__main-menu');
    this.toDecorPage = document.querySelector('.header-nav__decorations-menu');
    this.toTreePage = document.querySelector('.header-nav__tree-menu');
  }
  addListener() {
    this.startGame!.onclick = (event) => {
      pages.goToDecorPage();
    }
    this.toMainPage!.onclick = (event) => {
      pages.goToMainPage();
    }
    this.toDecorPage!.onclick = (event) => {
      pages.goToDecorPage();
    }
    this.toTreePage!.onclick = (event) => {
      pages.goToTreePage();
    }
  }
}

export const buttonsNav = new ButtonsNav();

buttonsNav.addListener();
