import carService from '../api/CarService';
import state from '../application/state';
import CarRender from '../RendersElements/CarRender';
import ControlsRender from '../RendersElements/ControlsRender';
import { brandsCars, modelsCars } from '../types/generateNameCars';
import { randomCars, randomColor } from '../types/helperFunc';
import garageRender from './GarageRender';

class GarageRaceControlsRender {
  raceCarsButton: HTMLButtonElement | null = null;
  stopCarsButton: HTMLButtonElement | null = null;
  generateCarsButton: HTMLButtonElement | null = null;
  cars: CarRender[];

  constructor(cars: CarRender[]) {
    this.cars = cars;
  }
  render() {
    const raceButtonsContainer = document.createElement('li');
    raceButtonsContainer.classList.add('garage-page__settings-buttons');

    this.raceCarsButton = new ControlsRender(
      'race',
      'race',
      this.raceCars.bind(this)
    ).render();
    this.stopCarsButton = new ControlsRender(
      'reset',
      'reset',
      this.stopCars.bind(this)
    ).render();
    this.stopCarsButton.disabled = true;
    this.generateCarsButton = new ControlsRender(
      'generate',
      'generate',
      this.generateCars.bind(this)
    ).render();

    raceButtonsContainer.append(this.raceCarsButton);
    raceButtonsContainer.append(this.stopCarsButton);
    raceButtonsContainer.append(this.generateCarsButton);

    return raceButtonsContainer;
  }
  raceCars() {
    state.isWinner = false;
    this.cars.forEach((car) => car.drive());
    document.querySelectorAll('button').forEach((button) => {
      button.disabled = true;
    });
    this.raceCarsButton!.disabled = true;
    this.stopCarsButton!.disabled = false;
  }
  stopCars() {
    this.cars.forEach((car) => car.stop());
    document.querySelectorAll('button').forEach((button) => {
      button.disabled = false;
    });
    this.raceCarsButton!.disabled = false;
    this.stopCarsButton!.disabled = true;
    document.querySelectorAll('.stop-car').forEach((button) => {
      if (button instanceof HTMLButtonElement) button.disabled = true;
    });
  }
  async generateCars() {
    for (let i = 0; i <= 100; i++) {
      const model = randomCars(modelsCars, 0, modelsCars.length - 1);
      const brands = randomCars(brandsCars, 0, brandsCars.length - 1);

      await carService.set({
        color: randomColor(),
        name: `${brands} ${model}`,
      });
    }
    garageRender.render(await carService.all());
  }
}

export default GarageRaceControlsRender;
