import carService from '../api/CarService';
import { tableWinners } from '../types/layout';
import { IWinners } from '../types/types';

class WinnerCarRender {
  async render(args: IWinners, index: number) {
    console.log(args);
    const { id, wins, time } = args;
    const winner = await carService.get(id);

    const winnersCar = document.createElement('li');
    winnersCar.classList.add('table-winners__car');

    winnersCar.insertAdjacentHTML(
      'beforeend',
      tableWinners(index + 1, id, winner.color, winner.name, wins, time)
    );
    return winnersCar;
  }
}

export default WinnerCarRender;
