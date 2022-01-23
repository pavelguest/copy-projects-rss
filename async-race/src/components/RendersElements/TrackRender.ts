import carService from '../api/CarService';
import state from '../application/state';
import CarRender from './CarRender';
import ControlsRender from './ControlsRender';

class TrackRender {
  car: CarRender;

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

    const selectCarButton = new ControlsRender(
      'select-car',
      'select',
      this.selectCar.bind(this)
    );
    const deleteCarButton = new ControlsRender(
      'remove-car',
      'remove',
      this.removeCar.bind(this)
    );
    const raceCarButton = new ControlsRender(
      'start-car',
      'start',
      this.startCar.bind(this)
    );
    const stopCarButton = new ControlsRender(
      'reset-car',
      'reset',
      this.stopCar.bind(this)
    );

    controlWrapper.append(buttonsSettingsCar);
    buttonsSettingsCar.append(selectCarButton.render());
    buttonsSettingsCar.append(deleteCarButton.render());
    controlWrapper.append(buttonsGameCar);
    buttonsGameCar.append(raceCarButton.render());
    buttonsGameCar.append(stopCarButton.render());

    carWrapper.append(controlWrapper);
    this.car.render(carWrapper);

    return carWrapper;
  }
  async selectCar() {
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
    this.car.drive();
  }
  async stopCar() {
    this.car.stop();
  }
}

export default TrackRender;
