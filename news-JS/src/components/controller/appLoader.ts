import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: '884d732d37be4391a040c0554f0dd266',
    });
  }
}

export default AppLoader;
