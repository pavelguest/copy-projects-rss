import cars from '../api/Cars';
import render from '../render/Render';
import state from './state';

class Application {
  start() {
    render.renderBaseLayout();
    cars.getCars(state.page).then((elem) => render.renderGaragePage(elem));
  }
}

const app = new Application();

app.start();
