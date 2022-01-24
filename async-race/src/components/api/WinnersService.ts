import { ITimeWins, IWinners, IWins } from '../types/types';
import WinnersRepository from './WinnersRepository';

class WinnersService {
  repo: WinnersRepository;
  constructor() {
    this.repo = new WinnersRepository();
  }
  async all(page: number = 0) {
    const response = await this.repo.all(page);
    return {
      cars: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }
  async get(id: number) {
    const res = await this.repo.get(id);
    return res;
  }
  async set(body: IWinners) {
    this.repo.set(body);
    return this.all();
  }
  async update(id: number, body: IWins | ITimeWins) {
    this.repo.update(id, body);
    return this.all();
  }
  async delete(id: number) {
    await this.repo.delete(id);
    return this.all();
  }
}

const winnersService = new WinnersService();

export default winnersService;
