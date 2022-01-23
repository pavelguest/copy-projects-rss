import carService from '../api/CarService';
import garageRender from '../render/GarageRender';
import baseLayoutRender from '../RendersElements/BaseLayoutRender';
import state from './state';

class Application {
  async start() {
    baseLayoutRender.render();
    garageRender.render(await carService.all(state.page));
  }
}

const app = new Application();

app.start();
