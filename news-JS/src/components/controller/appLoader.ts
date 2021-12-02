import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '884d732d37be4391a040c0554f0dd266', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
