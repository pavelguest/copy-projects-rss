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
  // get: (id: number) => Promise<T>;
  set: (body: ICar) => Promise<T>;
  delete: (id: number) => Promise<T>;
}
interface IData {
  cars: Promise<ICars>;
  count: string | null;
}
export { ICar, ICars, IService, IData };
