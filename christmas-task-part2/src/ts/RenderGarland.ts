import { buttonsTree } from './ButtonsTree';

class RenderGarland {
  container: HTMLElement | null;

  constructor() {
    this.container = document.querySelector('.tree-container__garland');
  }

  render(
    count: number,
    height: number,
    color: string | undefined,
    gap: number
  ): void {
    const ul = document.createElement('ul');
    ul.classList.add('lightrope');
    for (let index = 0; index < count; index++) {
      const li = document.createElement('li');
      li.classList.add(color as string);
      if (index === 1) {
        li.style.transform = `rotate(${index * 12 + 65}deg) translate(${
          height * 60
        }px) rotate(-${index * 12 + 65}deg)`;
      } else if (index === count) {
        li.style.transform = `rotate(${index * 12 + 110}deg) translate(${
          height * 60
        }px) rotate(-${index * 12 + 110}deg)`;
      }
      li.style.transform = `rotate(${index * gap + 65}deg) translate(${
        height * 60
      }px) rotate(-${index * gap + 65}deg)`;
      ul.append(li);
    }
    this.container!.append(ul);
  }

  addListener(): void {
    buttonsTree.garlandButtons!.onclick = (event) => {
      this.container!.innerHTML = '';
      (buttonsTree.garlandCheckbox as HTMLInputElement).checked = true;
      let color;
      if (
        event.target instanceof HTMLElement &&
        event.target !== event.currentTarget
      ) {
        color = event.target.dataset.color;
      }
      this.render(5, 1, color, 12);
      this.render(6, 3, color, 11);
      this.render(9, 5, color, 6);
      this.render(12, 7, color, 4.5);
      this.render(15, 9, color, 3.5);
    };
  }
}

export const renderGarland = new RenderGarland();
