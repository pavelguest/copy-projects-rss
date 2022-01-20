interface ICar {
  color: string;
  name: string;
}
interface ICars {
  name: string;
  color: string;
  id: number;
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
enum IStatus {
  started = `started`,
  stopped = `stopped`,
  drive = `drive`,
}
interface IState {
  page: number;
  countCar: number;
  selectCar: number;
}
export { ICar, ICars, IService, IData, IStatus, IState };
