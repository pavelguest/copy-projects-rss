import carService from '../api/CarService';
import render from '../render/Render';

class Application {
  async start() {
    render.baseLayout();
    render.garagePage(await carService.all());
  }
}

const app = new Application();

app.start();
