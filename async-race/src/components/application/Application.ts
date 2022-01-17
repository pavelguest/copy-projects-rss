import carService from '../api/CarService';
import render from '../render/Render';
import state from './state';

class Application {
  async start() {
    render.baseLayout();
    render.garagePage(await carService.all());
  }
}

const app = new Application();

app.start();
