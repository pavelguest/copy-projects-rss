import state from '../application/state';
import { ICar, IData, IService } from '../types/Types';
import CarsRepository from './CarsRepository';

class CarService implements IService<IData> {
  repo: CarsRepository;
  constructor() {
    this.repo = new CarsRepository();
  }
  async all(page: number = 0) {
    const response = await this.repo.All(page);
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
    return this.all();
  }
  async get(id: number) {
    return this.repo.get(id);
  }
  async update(id: number, body: ICar) {
    this.repo.update(id, body);
    return this.all();
  }
}

const carService = new CarService();

export default carService;
