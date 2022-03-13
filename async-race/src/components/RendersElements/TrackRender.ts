import carService from '../api/CarService';
import state from '../application/state';
import CarRender from './CarRender';
import ControlsRender from './ControlsRender';

class TrackRender {
  car: CarRender;
  selectCarButton: HTMLButtonElement | null = null;
  deleteCarButton: HTMLButtonElement | null = null;
  raceCarButton: HTMLButtonElement | null = null;
  stopCarButton: HTMLButtonElement | null = null;
  constructor(car: CarRender) {
    this.car = car;
  }

  render() {
    const carWrapper = document.createElement('li');
    carWrapper.classList.add('cars-list__item-car');

    const controlWrapper = document.createElement('li');
    controlWrapper.classList.add('item-car__buttons');

    const buttonsSettingsCar = document.createElement('li');
    buttonsSettingsCar.classList.add('buttons__settings-car');

    const buttonsGameCar = document.createElement('li');
    buttonsGameCar.classList.add('buttons__game-car');

    this.selectCarButton = new ControlsRender(
      'select-car',
      'select',
      this.selectCar.bind(this)
    ).render();
    this.deleteCarButton = new ControlsRender(
      'remove-car',
      'remove',
      this.removeCar.bind(this)
    ).render();
    this.raceCarButton = new ControlsRender(
      'start-car',
      'start',
      this.startCar.bind(this)
    ).render();
    this.raceCarButton.classList.add('start-car');
    this.stopCarButton = new ControlsRender(
      'reset-car',
      'reset',
      this.stopCar.bind(this)
    ).render();
    this.stopCarButton.disabled = true;
    this.stopCarButton.classList.add('stop-car');
    controlWrapper.append(buttonsSettingsCar);

    buttonsSettingsCar.append(this.selectCarButton, this.deleteCarButton);

    controlWrapper.append(buttonsGameCar);

    buttonsGameCar.append(this.raceCarButton, this.stopCarButton);

    carWrapper.append(controlWrapper);

    this.car.render(carWrapper);

    return carWrapper;
  }
  selectCar() {
    const updateName = document.getElementById(
      'update-name'
    ) as HTMLButtonElement;
    const update = document.getElementById('update') as HTMLButtonElement;
    const updateColor = document.getElementById(
      'update-color'
    ) as HTMLButtonElement;
    update.disabled = false;
    state.selectCar = this.car.id;
    updateName.value = this.car.name;
    updateColor.value = this.car.color;
  }
  async removeCar() {
    this.car.delete();
  }
  async startCar() {
    this.raceCarButton!.disabled = true;
    this.stopCarButton!.disabled = false;
    this.car.drive();
  }
  async stopCar() {
    this.raceCarButton!.disabled = false;
    this.stopCarButton!.disabled = true;
    this.car.stop();
  }
  disabledButtons() {}
}

export default TrackRender;
