import cars from '../api/Cars';
import state from '../application/state';
import render from '../render/Render';

class Buttons {
  addListenerForButtonsCar(id: number) {
    document
      .getElementById(`select-car${id}`)
      ?.addEventListener('click', () => console.log(`1`));
    document
      .getElementById(`remove-car${id}`)
      ?.addEventListener('click', () => {
        cars.deleteCar(id);
        cars.getCars(state.page).then((elem) => render.renderGaragePage(elem));
      });
    document
      .getElementById(`start-car${id}`)
      ?.addEventListener('click', () => console.log(`1`));
    document
      .getElementById(`reset-car${id}`)
      ?.addEventListener('click', () => console.log(`1`));
  }
  addListenerForListCars() {
    console.log(`1`);

    document.getElementById('next-list')?.addEventListener('click', () => {
      state.page += 1;
      cars.getCars(state.page).then((elem) => render.renderGaragePage(elem));
    });
    document.getElementById('prev-list')?.addEventListener('click', () => {
      state.page -= 1;
      cars.getCars(state.page).then((elem) => render.renderGaragePage(elem));
    });
  }
}

const buttons = new Buttons();

export default buttons;
