import carService from '../api/CarService';
import state from '../application/state';
import render from '../render/Render';

class Listeners {
  addListenerForButtonsCar(idCar: number) {
    document
      .getElementById(`select-car${idCar}`)
      ?.addEventListener('click', async () => {
        const { color, name, id } = await carService.get(idCar);
        state.selectCar = id;
        (document.getElementById('update-name') as HTMLButtonElement).value =
          name;
        (document.getElementById('update-color') as HTMLButtonElement).value =
          color;
      });
    document
      .getElementById(`remove-car${idCar}`)
      ?.addEventListener('click', async () => {
        render.garagePage(await carService.delete(idCar));
      });
    document
      .getElementById(`start-car${idCar}`)
      ?.addEventListener('click', () => console.log(`1`));
    document
      .getElementById(`reset-car${idCar}`)
      ?.addEventListener('click', () => console.log(`1`));
  }
  addListenerForListCars() {
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
    const buttonCreateCar = document.getElementById(
      'create'
    ) as HTMLButtonElement;
    const inputNameCar = document.getElementById(
      'create-name'
    ) as HTMLInputElement;
    const inputColorCar = document.getElementById(
      'create-color'
    ) as HTMLInputElement;
    const buttonUpdateCar = document.getElementById(
      'update'
    ) as HTMLButtonElement;
    const inputUpdateNameCar = document.getElementById(
      'update-name'
    ) as HTMLButtonElement;
    const inputUpdateColorCar = document.getElementById(
      'update-color'
    ) as HTMLButtonElement;

    buttonCreateCar.addEventListener('click', async () => {
      if (inputNameCar.value !== '') {
        render.garagePage(
          await carService.set({
            color: inputColorCar.value,
            name: inputNameCar.value.trim(),
          })
        );
        buttonCreateCar.disabled = true;
      }
    });
    inputNameCar.addEventListener('input', () => {
      if (inputNameCar.value) {
        buttonCreateCar.disabled = false;
      }
    });
    buttonUpdateCar.addEventListener('click', async () => {
      if (state.selectCar !== 0.5) {
        render.garagePage(
          await carService.update(state.selectCar, {
            color: inputUpdateColorCar.value,
            name: inputUpdateNameCar.value,
          })
        );
        state.selectCar = 0.5;
      }
    });
  }
}

const listeners = new Listeners();

export default listeners;
