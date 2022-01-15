import { ICar } from '../types/types';

class Cars {
  baseUrl: string = 'http://localhost:3000';
  garage: string = `${this.baseUrl}/garage`;

  async getCars() {
    const cars = await (await fetch(this.garage)).json();
    return cars;
  }
  async getCar(id: number) {
    const car = await (await fetch(`${this.garage}/${id}`)).json();
    console.log(car);
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

const api = new Cars();
api.getCars();
api.getCar(2);
api.setCar({
  color: 'green',
  name: 'volga',
});
api.deleteCar(1);
