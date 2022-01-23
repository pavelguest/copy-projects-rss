import state from '../application/state';
import { ITimeWins, IWinners, IWins } from '../types/Types';

class WinnersRepository {
  baseUrl: string = 'http://localhost:3000';
  winners: string = `${this.baseUrl}/winners`;

  async all(page: number, limit = 10) {
    return await fetch(
      `${this.winners}?_page=${page}&_limit=${limit}&_sort=${state.sort}&_order=${state.order}`
    );
  }
  async get(id: number) {
    const response = await fetch(`${this.winners}/${id}`);
    return response;
  }
  async set(body: IWinners) {
    await (
      await fetch(this.winners, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }
  async delete(id: number) {
    const response = await fetch(`${this.winners}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
  async update(id: number, body: IWins | ITimeWins) {
    await (
      await fetch(`${this.winners}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }
}

export default WinnersRepository;
