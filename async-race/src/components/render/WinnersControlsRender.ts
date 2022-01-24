import winnersService from '../api/WinnersService';
import state from '../application/state';
import ControlsRender from '../RendersElements/ControlsRender';
import winnersRender from './WinnersRender';

class WinnersControlsListRender {
  render(count: number, page: number) {
    const controls = document.createElement('li');
    controls.classList.add('controls__left');

    const countWins = document.createElement('h2');
    countWins.classList.add('garage-page__title');
    countWins.textContent = `Winners (${count})`;

    const winnersNavPages = document.createElement('li');
    winnersNavPages.classList.add('garage-page__nav');

    const winnersNavTitle = document.createElement('p');
    winnersNavTitle.classList.add('garage-page__nav-title');
    winnersNavTitle.textContent = `page #${page}`;

    const winnersNavButtons = document.createElement('li');
    winnersNavButtons.classList.add('garage-page__nav-buttons');

    const prevListButton = new ControlsRender(
      'prev-list-wins',
      'prev',
      this.prevList.bind(this)
    );
    const nextListButton = new ControlsRender(
      'next-list-wins',
      'next',
      this.nextList.bind(this)
    );

    controls.append(countWins);
    controls.append(winnersNavPages);
    winnersNavPages.append(winnersNavTitle);
    winnersNavPages.append(winnersNavButtons);
    winnersNavButtons.append(prevListButton.render());
    winnersNavButtons.append(nextListButton.render());
    return controls;
  }
  async prevList() {
    if (state.pageWin > 1) state.pageWin -= 1;
    winnersRender.render(await winnersService.all(state.pageWin));
  }
  async nextList() {
    if (state.countWins! / 10 >= state.pageWin) {
      state.pageWin += 1;
    }
    winnersRender.render(await winnersService.all(state.pageWin));
  }
}

export default WinnersControlsListRender;
