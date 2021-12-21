import { buttons } from "./Buttons";
import { buttonsNav } from "./ButtonsNav";
import { app } from "./CreateElement";

class Pages {
  mainPage: HTMLElement | null;

  decorPage: HTMLElement | null;

  treePage: HTMLElement | null;

  constructor() {
    this.mainPage = document.querySelector('.main-page');
    this.decorPage = document.querySelector('.decorations-page');
    this.treePage = document.querySelector('.tree-page');
  }
  goToDecorPage() {
    this.decorPage!.style.display = 'flex';
    buttons.search!.style.display = 'block';
    buttons.favoriteCount!.style.display = 'block';
    buttonsNav.toMainPage!.style.display = 'block';
    buttonsNav.toTreePage!.style.display = 'block';
    this.treePage!.style.display = 'none';
    buttonsNav.toDecorPage!.style.display = 'none';
    this.mainPage!.style.display = 'none';

    app.setData();
    app.filtration();
    app.addListenerForButtons();
  }
  goToMainPage() {
    this.decorPage!.style.display = 'none';
    this.treePage!.style.display = 'none';
    buttons.search!.style.display = 'none';
    buttons.favoriteCount!.style.display = 'none';
    buttonsNav.toMainPage!.style.display = 'none';
    buttonsNav.toDecorPage!.style.display = 'block';
    buttonsNav.toTreePage!.style.display = 'block';
    this.mainPage!.style.display = 'flex';
  }
  goToTreePage() {
    this.treePage!.style.display = 'flex';
    buttonsNav.toMainPage!.style.display = 'block';
    buttonsNav.toDecorPage!.style.display = 'block';
    this.decorPage!.style.display = 'none';
    buttons.search!.style.display = 'none';
    buttons.favoriteCount!.style.display = 'none';
    buttonsNav.toTreePage!.style.display = 'none';
    this.mainPage!.style.display = 'none';
  }
}

export const pages = new Pages();
