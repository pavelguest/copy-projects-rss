import state from '../application/state';
import CarRender from '../RendersElements/CarRender';
import TrackRender from '../RendersElements/TrackRender';
import { ICars } from '../types/Types';
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
    this.arrCars = [];
    this.mainPage.innerHTML = '';
    const garageWrapper = document.createElement('li');
    const garageControls = document.createElement('li');
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
    garageControls.append(this.garageRaceControls.render());
    garageControls.append(this.garageRightControls.render());
  }
}

const garageRender = new GarageRender();

export default garageRender;
