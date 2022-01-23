import carService from '../api/CarService';
import state from '../application/state';
import ControlsRender from '../RendersElements/ControlsRender';
import garageRender from './GarageRender';

class GarageRightControlsRender {
  inputCreateName: HTMLInputElement | null = null;
  inputCreateColor: HTMLInputElement | null = null;
  buttonCreateCar: HTMLButtonElement | null = null;
  inputUpdateName: HTMLInputElement | null = null;
  inputUpdateColor: HTMLInputElement | null = null;
  buttonUpdateCar: HTMLButtonElement | null = null;
  render() {
    const rightControls = document.createElement('li');
    rightControls.classList.add('controls__right');

    const controlsContainer = document.createElement('li');
    controlsContainer.classList.add('garage-page__settings-inputs');

    const createCarControls = document.createElement('li');
    createCarControls.classList.add('settings-inputs__create');

    this.inputCreateName = document.createElement('input');
    this.inputCreateName.type = 'text';
    this.inputCreateName.id = 'create-name';

    this.inputCreateColor = document.createElement('input');
    this.inputCreateColor.type = 'color';
    this.inputCreateColor.id = 'create-color';

    this.buttonCreateCar = new ControlsRender(
      'create',
      'create',
      this.createCar.bind(this)
    ).render();

    const updateCarControls = document.createElement('li');
    updateCarControls.classList.add('settings-inputs__update');

    this.inputUpdateName = document.createElement('input');
    this.inputUpdateName.type = 'text';
    this.inputUpdateName.id = 'update-name';

    this.inputUpdateColor = document.createElement('input');
    this.inputUpdateColor.type = 'color';
    this.inputUpdateColor.id = 'update-color';

    this.buttonUpdateCar = new ControlsRender(
      'update',
      'update',
      this.updateCar.bind(this)
    ).render();

    this.inputCreateName.addEventListener('input', () => {
      this.updateInputName();
    });

    rightControls.append(controlsContainer);
    controlsContainer.append(createCarControls);
    controlsContainer.append(updateCarControls);
    createCarControls.append(this.inputCreateName);
    createCarControls.append(this.inputCreateColor);
    createCarControls.append(this.buttonCreateCar);
    updateCarControls.append(this.inputUpdateName);
    updateCarControls.append(this.inputUpdateColor);
    updateCarControls.append(this.buttonUpdateCar);

    return rightControls;
  }
  updateInputName() {
    if (this.inputCreateName!.value) {
      this.buttonCreateCar!.disabled = false;
    }
  }
  async createCar() {
    if (this.inputCreateName!.value !== '') {
      garageRender.render(
        await carService.set({
          color: this.inputCreateColor!.value,
          name: this.inputCreateName!.value.trim(),
        })
      );
      this.buttonCreateCar!.disabled = true;
    }
  }
  async updateCar() {
    if (state.selectCar !== 0.5) {
      garageRender.render(
        await carService.update(state.selectCar, {
          color: this.inputUpdateColor!.value,
          name: this.inputUpdateName!.value,
        })
      );
      state.selectCar = 0.5;
    }
  }
}

export default GarageRightControlsRender;
