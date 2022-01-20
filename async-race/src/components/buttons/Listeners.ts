import carService from '../api/CarService';
import engineService from '../api/EngineService';
import state from '../application/state';
import render from '../render/Render';
import { brandsCars, modelsCars } from '../types/generateNameCars';
import {
  animation,
  getDistance,
  randomCars,
  randomColor,
} from '../types/helperFunc';
import { IStatus } from '../types/Types';

class Listeners {
  addListenerForButtonsCar(idCar: number) {
    const updateName = document.getElementById(
      'update-name'
    ) as HTMLButtonElement;
    const update = document.getElementById('update') as HTMLButtonElement;
    const updateColor = document.getElementById(
      'update-color'
    ) as HTMLButtonElement;
    document
      .getElementById(`select-car${idCar}`)
      ?.addEventListener('click', async () => {
        update.disabled = false;
        const { color, name, id } = await carService.get(idCar);
        state.selectCar = id;
        updateName.value = name;
        updateColor.value = color;
      });
    document
      .getElementById(`remove-car${idCar}`)
      ?.addEventListener('click', async () => {
        render.garagePage(await carService.delete(idCar));
      });
    document
      .getElementById(`start-car${idCar}`)
      ?.addEventListener('click', async () => {
        const { velocity, distance } = await engineService.status(
          idCar,
          IStatus.started
        );
        const start = document.querySelector(
          `.car-number${idCar}`
        ) as HTMLElement;
        const finish = document.querySelector('.flag') as HTMLElement;
        const HTMLdistance: number = getDistance(start, finish);
        console.log(HTMLdistance);
        const idAnimation = animation(distance / velocity, start, HTMLdistance);
      });
    document.getElementById(`reset-car${idCar}`)?.addEventListener(
      'click',
      () => {}
      // engineService.status(idCar, IStatus.stopped)
    );
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
        const model = randomCars(modelsCars, 0, modelsCars.length - 1);
        const brands = randomCars(brandsCars, 0, brandsCars.length - 1);

        await carService.set({
          color: randomColor(),
          name: `${brands} ${model}`,
        });
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
