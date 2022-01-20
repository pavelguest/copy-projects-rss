import Engine from './Engine';

class EngineService {
  repo: Engine;
  constructor() {
    this.repo = new Engine();
  }
  async status(id: number, status: string) {
    return this.repo.status(id, status);
  }
}

const engineService = new EngineService();

export default engineService;
