import winnersService from '../api/WinnersService';
import state from '../application/state';
import winnersRender from '../render/WinnersRender';
import ControlsRender from './ControlsRender';

class WinnersSortControls {
  isSortId = false;
  isSortWins = false;
  isSortTime = false;
  render() {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-winners__title');
    const buttonIdWinner = new ControlsRender(
      'id-winner',
      'ID',
      this.sort.bind(this, 'id')
    ).render();
    const numerations = document.createElement('div');
    numerations.textContent = '№';
    const imageWinnerCar = document.createElement('div');
    imageWinnerCar.textContent = `CAR`;
    const nameWinnerCar = document.createElement('div');
    nameWinnerCar.textContent = `NAME`;
    const buttonWinsCars = new ControlsRender(
      'cars-winners',
      'WINS',
      this.sort.bind(this, 'wins')
    ).render();
    const buttonBestTimeWinners = new ControlsRender(
      'time-winners',
      'BEST TIME',
      this.sort.bind(this, 'time')
    ).render();
    tableWrapper.append(numerations);
    tableWrapper.append(buttonIdWinner);
    tableWrapper.append(imageWinnerCar);
    tableWrapper.append(nameWinnerCar);
    tableWrapper.append(buttonWinsCars);
    tableWrapper.append(buttonBestTimeWinners);

    return tableWrapper;
  }
  async sort(type: string) {
    state.sort = type;
    if (!this.isSortId) {
      state.order = 'DESC';
      this.isSortId = true;
    } else {
      state.order = 'ASC';
      this.isSortId = false;
    }
    winnersRender.render(await winnersService.all());
  }
}
export default WinnersSortControls;
