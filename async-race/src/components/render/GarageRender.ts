import state from '../application/state';
import CarRender from '../RendersElements/CarRender';
import TrackRender from '../RendersElements/TrackRender';
import { ICars, ICarsForRender } from '../types/types';
import GarageNavControlsRender from './GarageNavControlsRender';
import GarageRaceControlsRender from './GarageRaceControlsRender';
import GarageSettingsControlsRender from './GarageSettingsControlsRender';

class GarageRender {
  arrCars: CarRender[];
  arrTracks: TrackRender[];
  mainPage: HTMLElement | null = null;
  garageLeftControls: GarageNavControlsRender;
  garageRightControls: GarageSettingsControlsRender;
  garageRaceControls: GarageRaceControlsRender | null = null;
  constructor() {
    this.arrCars = [];
    this.arrTracks = [];
    this.garageLeftControls = new GarageNavControlsRender();
    this.garageRightControls = new GarageSettingsControlsRender();
  }
  render({ ...args }: ICarsForRender) {
    this.mainPage = document.getElementById('main-page');
    if (!this.mainPage) {
      return;
    }
    const { cars, count } = args;
    state.countCar = Number(count);
    this.arrCars = [];
    this.arrTracks = [];
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
      this.arrTracks.push(track);
      carsWrapper.append(track.render());
    });
    this.garageRaceControls = new GarageRaceControlsRender(this.arrCars);

    garageControls.append(
      this.garageLeftControls.render(Number(count), state.page)
    );
    const rightControls = this.garageRightControls.render();
    garageControls.append(rightControls);
    rightControls.append(this.garageRaceControls.render());
  }
}

const garageRender = new GarageRender();

export default garageRender;
