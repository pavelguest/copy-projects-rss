import { ICar, ICars } from '../types/types';

class CarsRepository {
  baseUrl: string = 'http://localhost:3000';
  garage: string = `${this.baseUrl}/garage`;

  async All(page: number, limit = 7) {
    return await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
  }
  async get(id: number): Promise<ICars> {
    const response = await fetch(`${this.garage}/${id}`);
    return response.json();
  }
  async set(body: ICar) {
    await (
      await fetch(this.garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }
  async delete(id: number) {
    const res = await fetch(`${this.garage}/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  }
  async update(id: number, body: ICar) {
    await (
      await fetch(`${this.garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }
}

export default CarsRepository;
