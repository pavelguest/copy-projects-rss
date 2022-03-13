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
  async set(car: ICar) {
    await (
      await fetch(this.garage, {
        method: 'POST',
        body: JSON.stringify(car),
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
  async update(id: number, car: ICar) {
    await (
      await fetch(`${this.garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(car),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }
}

export default CarsRepository;
