import { pages } from "./Pages";

class RenderDecor {
  render(num: string, count: string) {
    pages.decorContainer!.insertAdjacentHTML('beforeend', `
    <div class="decor__img-container">
      <img class="decor__img" src="./assets/toys/${num}.png" alt="decoration">
      <span class="decor__count">${count}</span>
    </div>
    `)
  }
}

export const renderDecor = new RenderDecor();
