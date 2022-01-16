import { ICar } from '../types/Types';

class Cars {
  baseUrl: string = 'http://localhost:3000';
  garage: string = `${this.baseUrl}/garage`;

  async getCars(page: number, limit = 7) {
    const response = await fetch(
      `${this.garage}?_page=${page}&_limit=${limit}`
    );
    const cars = await response.json();
    return cars;
  }
  async getCar(id: number) {
    const response = await fetch(`${this.garage}/${id}`);
    const car = await response.json();
    return car;
  }
  async setCar(body: ICar) {
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
  async deleteCar(id: number) {
    await (
      await fetch(`${this.garage}/${id}`, {
        method: 'DELETE',
      })
    ).json();
  }
}

const cars = new Cars();

export default cars;
