import { pages } from './Pages';

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
    if (this.startGame && this.toMainPage && this.toDecorPage && this.toTreePage) {
      this.startGame.onclick = () => {
        pages.goToDecorPage();
      };
      this.toMainPage.onclick = () => {
        pages.goToMainPage();
      };
      this.toDecorPage.onclick = () => {
        pages.goToDecorPage();
      };
      this.toTreePage.onclick = () => {
        pages.goToTreePage();
      };
    }
  }
}

export const buttonsNav = new ButtonsNav();

buttonsNav.addListener();
