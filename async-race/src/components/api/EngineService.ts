import EngineRepository from './EngineRepository';

export class EngineService {
  repo: EngineRepository;
  constructor() {
    this.repo = new EngineRepository();
  }
  async status(id: number, status: string) {
    return this.repo.status(id, status).then((data) => {
      const { velocity, distance } = data;
      return distance / velocity;
    });
  }
}

const engineService = new EngineService();

export default engineService;
