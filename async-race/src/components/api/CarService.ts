import state from '../application/state';
import { ICar, IData, IService } from '../types/types';
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
  async set(car: ICar) {
    this.repo.set(car);
    return this.all();
  }
  async get(id: number) {
    return this.repo.get(id);
  }
  async update(id: number, car: ICar) {
    this.repo.update(id, car);
    return this.all();
  }
}

const carService = new CarService();

export default carService;
