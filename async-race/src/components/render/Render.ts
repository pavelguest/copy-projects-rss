import state from '../application/state';
import listeners from '../buttons/Listeners';
import { base, carContainer, garage } from '../types/layout';

class Render {
  baseLayout() {
    document.body.insertAdjacentHTML('beforeend', base);
  }
  garagePage({ ...args }) {
    const { cars, count } = args;

    document.getElementById('main-page')!.innerHTML = '';
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    div.classList.add('garage-page');
    ul.classList.add('garage-page__cars-list');
    div.insertAdjacentHTML('beforeend', garage(count, state.page));

    document.getElementById('main-page')?.append(div);
    div.append(ul);
    for (const { name, color, id } of cars) {
      ul.insertAdjacentHTML('beforeend', carContainer(id, name, color));
      listeners.addListenerForButtonsCar(id);
    }
    listeners.addListenerForListCars();
    listeners.addListenerForSettingsCars();
  }
}

const render = new Render();

export default render;
