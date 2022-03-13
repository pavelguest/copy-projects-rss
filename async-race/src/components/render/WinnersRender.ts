import state from '../application/state';
import WinnerCarRender from '../RendersElements/WinnerCarRender';
import WinnersSortControls from '../RendersElements/WinnersSortControls';
import { ICarsForRender, IWinners, IWinnersForRender } from '../types/types';
import WinnersControlsListRender from './WinnersControlsRender';

class WinnersRender {
  container: HTMLElement | null = null;
  winnersControlsListRender: WinnersControlsListRender;
  winnersSortControls: WinnersSortControls;
  winnerCarRender: WinnerCarRender;

  constructor() {
    this.winnersControlsListRender = new WinnersControlsListRender();
    this.winnersSortControls = new WinnersSortControls();
    this.winnerCarRender = new WinnerCarRender();
  }
  render({ ...args }: IWinnersForRender) {
    this.container = document.getElementById('main-page');
    if (!this.container) {
      return;
    }

    const { cars, count } = args;
    state.countWins = Number(count);

    this.container.innerHTML = '';
    const winnersWrapper = document.createElement('ul');
    const winnersControls = document.createElement('li');
    const resultWrapper = document.createElement('ul');
    winnersWrapper.classList.add('garage-page');
    winnersControls.classList.add('garage-page__controls');
    resultWrapper.classList.add('winners-page__cars-list');
    winnersWrapper.append(winnersControls);
    this.container.append(winnersWrapper);
    winnersWrapper.append(resultWrapper);
    winnersControls.append(
      this.winnersControlsListRender.render(Number(count), state.pageWin)
    );
    resultWrapper.append(this.winnersSortControls.render());

    cars.forEach(async (winner: IWinners, index: number) => {
      resultWrapper.append(await this.winnerCarRender.render(winner, index));
    });
  }
}

const winnersRender = new WinnersRender();

export default winnersRender;
