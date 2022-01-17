import cars from '../api/Cars';
import carService from '../api/CarService';
import state from '../application/state';
import render from '../render/Render';

class Buttons {
  addListenerForButtonsCar(id: number) {
    document
      .getElementById(`select-car${id}`)
      ?.addEventListener('click', () => console.log(`1`));
    document
      .getElementById(`remove-car${id}`)
      ?.addEventListener('click', async () => {
        render.garagePage(await carService.delete(id));
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

    document
      .getElementById('next-list')
      ?.addEventListener('click', async () => {
        state.page += 1;
        render.garagePage(await carService.all());
      });
    document
      .getElementById('prev-list')
      ?.addEventListener('click', async () => {
        if (state.page > 1) state.page -= 1;
        render.garagePage(await carService.all());
      });
  }
  addListenerForSettingsCars() {
    document.getElementById('create')?.addEventListener('click', () => {
      const a = document.getElementById('create-color') as HTMLInputElement;
      console.log(a.value);
    });
  }
}

const buttons = new Buttons();

export default buttons;
