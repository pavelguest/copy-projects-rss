class EngineRepository {
  baseUrl: string = 'http://localhost:3000';
  engine: string = `${this.baseUrl}/engine`;
  async status(id: number, status: string) {
    const response = await fetch(`${this.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    return response.json();
  }
}

export default EngineRepository;
