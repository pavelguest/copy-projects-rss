import { pages } from "./Pages";

class RenderSnow {
  intervalSnow: NodeJS.Timeout | null;

  constructor() {
    this.intervalSnow = null;
  }

   createSnow() {
    this.intervalSnow = setInterval(() => {
      let snow: HTMLElement = document.createElement('i');
      snow.classList.add('fas');
      snow.classList.add('fa-snowflake');
      snow.style.left = Math.random() * ((pages.treeContainer!).clientWidth) + 'px';
      snow.style.animationDuration = Math.random() * 3 + 5 + 's'; // between 2 - 5 seconds
      snow.style.opacity = Math.random().toString();
      snow.style.fontSize = Math.random() * 10 + 10 + 'px';

      pages.treeContainer!.appendChild(snow);

      setTimeout(() => {
        snow.remove();
      }, 3800)
    }, 50);
  }
  cancelIntervalSnow() {
    clearInterval(this.intervalSnow!);
  }
}

export const renderSnow = new RenderSnow();
