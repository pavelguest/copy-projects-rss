import carService from '../api/CarService';
import winnersService from '../api/WinnersService';
import state from '../application/state';
import garageRender from '../render/GarageRender';
import winnersRender from '../render/WinnersRender';
import { base } from '../types/layout';

class BaseLayoutRender {
  render() {
    document.body.insertAdjacentHTML('beforeend', base);
    document
      .getElementById('page-winners')
      ?.addEventListener('click', async () => {
        winnersRender.render(await winnersService.all(state.pageWin));
      });
    document
      .getElementById('page-garage')
      ?.addEventListener('click', async () => {
        garageRender.render(await carService.all(state.page));
      });
  }
}

const baseLayoutRender = new BaseLayoutRender();

export default baseLayoutRender;
