import carService from '../api/CarService';
import state from '../application/state';
import render from '../render/Render';
import { brandsCars, modelsCars } from '../types/generateNameCars';

class Listeners {
  generateRandomCars(arr: string[], min: number, max: number) {
    return arr[Math.round(Math.random() * (max - min) + min)];
  }
  addListenerForButtonsCar(idCar: number) {
    document
      .getElementById(`select-car${idCar}`)
      ?.addEventListener('click', async () => {
        (document.getElementById('update') as HTMLButtonElement).disabled =
          false;
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
    const buttonCarsGenerate = document.getElementById(
      'generate'
    ) as HTMLButtonElement;

    buttonCarsGenerate.addEventListener('click', async () => {
      for (let i = 0; i <= 100; i++) {
        const model = this.generateRandomCars(
          modelsCars,
          0,
          modelsCars.length - 1
        );
        const brands = this.generateRandomCars(
          brandsCars,
          0,
          brandsCars.length - 1
        );
        const colorCar =
          '#' +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

        await carService.set({ color: colorCar, name: `${brands} ${model}` });
      }
      render.garagePage(await carService.all());
    });
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
