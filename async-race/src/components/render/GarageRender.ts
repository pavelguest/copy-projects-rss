import state from '../application/state';
import CarRender from '../RendersElements/CarRender';
import TrackRender from '../RendersElements/TrackRender';
import { ICars } from '../types/types';
import GarageLeftControlsRender from './GarageLeftControlsRender';
import GarageRaceControlsRender from './GarageRaceControlsRender';
import GarageRightControlsRender from './GarageRightControlsRender';

class GarageRender {
  arrCars: CarRender[];
  mainPage: HTMLElement | null = null;
  garageLeftControls: GarageLeftControlsRender;
  garageRightControls: GarageRightControlsRender;
  garageRaceControls: GarageRaceControlsRender | null = null;
  constructor() {
    this.arrCars = [];
    this.garageLeftControls = new GarageLeftControlsRender();
    this.garageRightControls = new GarageRightControlsRender();
  }
  render({ ...args }) {
    this.mainPage = document.getElementById('main-page');
    if (!this.mainPage) {
      return;
    }
    const { cars, count } = args;
    state.countCar = count;
    this.arrCars = [];
    this.mainPage.innerHTML = '';
    const garageWrapper = document.createElement('div');
    const garageControls = document.createElement('div');
    const carsWrapper = document.createElement('ul');
    garageWrapper.classList.add('garage-page');
    garageControls.classList.add('garage-page__controls');
    carsWrapper.classList.add('garage-page__cars-list');
    garageWrapper.append(garageControls);
    this.mainPage.append(garageWrapper);
    garageWrapper.append(carsWrapper);
    cars.forEach((dataCar: ICars) => {
      const car = new CarRender(dataCar);
      this.arrCars.push(car);
      const track = new TrackRender(car);
      carsWrapper.append(track.render());
    });
    this.garageRaceControls = new GarageRaceControlsRender(this.arrCars);

    garageControls.append(this.garageLeftControls.render(count, state.page));
    const rightControls = this.garageRightControls.render();
    garageControls.append(rightControls);
    rightControls.append(this.garageRaceControls.render());
  }
}

const garageRender = new GarageRender();

export default garageRender;
