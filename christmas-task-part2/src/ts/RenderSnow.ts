import { pages } from './Pages';

class RenderSnow {
  intervalSnow: NodeJS.Timeout | null;

  constructor() {
    this.intervalSnow = null;
  }

  createSnow() {
    this.intervalSnow = setInterval(() => {
      const snow: HTMLElement = document.createElement('i');
      snow.classList.add('fas');
      snow.classList.add('fa-snowflake');
      snow.style.left = Math.random() * ((pages.treeContainer as HTMLElement).clientWidth) + 'px';
      snow.style.animationDuration = Math.random() * 3 + 5 + 's'; // between 2 - 5 seconds
      snow.style.opacity = Math.random().toString();
      snow.style.fontSize = Math.random() * 10 + 10 + 'px';

      (pages.treeContainer as HTMLElement).appendChild(snow);

      setTimeout(() => {
        snow.remove();
      }, 3800);
    }, 50);
  }

  cancelIntervalSnow() {
    clearInterval(this.intervalSnow as NodeJS.Timeout);
  }
}

export const renderSnow = new RenderSnow();
