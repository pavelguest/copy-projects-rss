import state from '../application/state';
import { ICar, IData, IService } from '../types/Types';
import Cars from './Cars';

class CarService implements IService<IData> {
  repo: Cars;
  constructor() {
    this.repo = new Cars();
  }
  async all() {
    const response = await this.repo.All(state.page);
    return {
      cars: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }
  async delete(id: number) {
    await this.repo.delete(id);
    return this.all();
  }
  async set(body: ICar) {
    this.repo.set(body);
  }
}

const carService = new CarService();

export default carService;
