import carService from '../api/CarService';
import state from '../application/state';
import ControlsRender from '../RendersElements/ControlsRender';
import garageRender from './GarageRender';

class GarageNavControlsRender {
  render(count: number, page: number) {
    const leftControls = document.createElement('div');
    leftControls.classList.add('controls__left');

    const countCars = document.createElement('h2');
    countCars.classList.add('garage-page__title');
    countCars.textContent = `Garage (${count})`;

    const garageNavPages = document.createElement('div');
    garageNavPages.classList.add('garage-page__nav');

    const garageNavTitle = document.createElement('p');
    garageNavTitle.classList.add('garage-page__nav-title');
    garageNavTitle.textContent = `page #${page}`;

    const garageNavButtons = document.createElement('div');
    garageNavButtons.classList.add('garage-page__nav-buttons');

    const prevListButton = new ControlsRender(
      'prev-list',
      'prev',
      this.prevList.bind(this)
    );
    const nextListButton = new ControlsRender(
      'next-list',
      'next',
      this.nextList.bind(this)
    );

    leftControls.append(countCars);
    leftControls.append(garageNavPages);
    garageNavPages.append(garageNavTitle);
    garageNavPages.append(garageNavButtons);
    garageNavButtons.append(prevListButton.render());
    garageNavButtons.append(nextListButton.render());
    return leftControls;
  }
  async prevList() {
    if (state.page > 1) state.page -= 1;
    garageRender.render(await carService.all(state.page));
  }
  async nextList() {
    if (state.countCar! / 7 >= state.page) {
      state.page += 1;
    }
    garageRender.render(await carService.all(state.page));
  }
}

export default GarageNavControlsRender;
