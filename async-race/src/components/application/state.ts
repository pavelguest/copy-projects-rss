import { IState } from '../types/types';

let state: IState = {
  page: 1,
  pageWin: 1,
  sort: 'id',
  order: 'ASC',
  countCar: 0,
  countWins: 0,
  selectCar: 0.5,
  selectCarName: '',
  isWinner: false,
};
export default state;
