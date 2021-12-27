import { buttonsDecor } from "./ButtonsDecor";
import { buttonsNav } from "./ButtonsNav";
import { buttonsTree } from "./ButtonsTree";
import { app } from "./CreateElement";
import { dragDecors } from "./DragDecors";
import { filterDecor } from "./FilterDecor";
import { renderGarland } from "./RenderGarland";

class Pages {
  mainPage: HTMLElement | null;

  decorPage: HTMLElement | null;

  treePage: HTMLElement | null;

  decorContainer: HTMLElement | null;

  treeContainer: HTMLElement | null;

  treeImg: HTMLImageElement | null;

  constructor() {
    this.mainPage = document.querySelector('.main-page');
    this.decorPage = document.querySelector('.decorations-page');
    this.treePage = document.querySelector('.tree-page');
    this.decorContainer = document.querySelector('.decor-container');
    this.treeContainer = document.querySelector('.tree-container');
    this.treeImg = document.querySelector('.tree__img');
  }
  goToDecorPage() {
    this.decorPage!.style.display = 'flex';
    buttonsDecor.search!.style.display = 'block';
    buttonsDecor.favoriteCount!.style.display = 'block';
    buttonsNav.toMainPage!.style.display = 'block';
    buttonsNav.toTreePage!.style.display = 'block';
    this.treePage!.style.display = 'none';
    buttonsNav.toDecorPage!.style.display = 'none';
    this.mainPage!.style.display = 'none';
    buttonsTree.stopMusic();

    app.setData();
    app.filtration();
    app.addListenerForButtons();
  }
  goToMainPage() {
    this.decorPage!.style.display = 'none';
    this.treePage!.style.display = 'none';
    buttonsDecor.search!.style.display = 'none';
    buttonsDecor.favoriteCount!.style.display = 'none';
    buttonsNav.toMainPage!.style.display = 'none';
    buttonsNav.toDecorPage!.style.display = 'block';
    buttonsNav.toTreePage!.style.display = 'block';
    this.mainPage!.style.display = 'flex';
    buttonsTree.stopMusic();
  }
  goToTreePage() {
    this.treePage!.style.display = 'flex';
    buttonsNav.toMainPage!.style.display = 'block';
    buttonsNav.toDecorPage!.style.display = 'block';
    this.decorPage!.style.display = 'none';
    buttonsDecor.search!.style.display = 'none';
    buttonsDecor.favoriteCount!.style.display = 'none';
    buttonsNav.toTreePage!.style.display = 'none';
    this.mainPage!.style.display = 'none';

    app.setData();
    buttonsTree.setData();
    this.decorContainer!.innerHTML = '';
    filterDecor.filter();
    renderGarland.addListener();
    buttonsTree.addListener();
    dragDecors.addListener();
  }
}

export const pages = new Pages();
