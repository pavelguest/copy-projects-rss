interface ICar {
  color: string;
  name: string;
}
interface ICars {
  name: string;
  color: string;
  id: number;
}
interface IWinners {
  id: number;
  wins: number;
  time: number;
}

interface IWins {
  wins: number;
  time: number;
}
interface ITimeWins {
  time: number;
}

interface IService<T> {
  all: () => Promise<T>;
  set: (body: ICar) => Promise<T>;
  delete: (id: number) => Promise<T>;
  update: (id: number, body: ICar) => Promise<T>;
}
interface IData {
  cars: Promise<ICars>;
  count: string | null;
}
enum raceStatus {
  started = `started`,
  stopped = `stopped`,
  drive = `drive`,
}
interface IState {
  page: number;
  pageWin: number;
  sort: string;
  order: string;
  countCar: number;
  countWins: number;
  selectCar: number;
  selectCarName: string;
  isWinner: boolean;
}
interface ICarsForRender {
  cars: ICars[];
  count: string | null;
}

interface IWinnersForRender {
  cars: IWinners[];
  count: string | null;
}
export {
  ICar,
  ICars,
  IWinners,
  IWins,
  ITimeWins,
  IService,
  IData,
  raceStatus as IStatus,
  IState,
  ICarsForRender,
  IWinnersForRender,
};
