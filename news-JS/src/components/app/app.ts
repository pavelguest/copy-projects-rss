import { DataNews } from 'components/types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  public controller: AppController;

  public view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
      this.controller.getNews(e, (data: DataNews) => this.view.drawNews(data)),
    );
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
