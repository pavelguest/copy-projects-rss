import carService from '../api/CarService';
import { EngineService } from '../api/EngineService';
import winnersService from '../api/WinnersService';
import state from '../application/state';
import garageRender from '../render/GarageRender';
import { animation, getDistance } from '../types/helperFunc';
import { carSvg } from '../types/layout';
import { ICars, IStatus } from '../types/Types';
import baseLayoutRender from './BaseLayoutRender';
import windowWinnerCarRender from './WindowWinnerCarRender';

class CarRender {
  id: number;
  name: string;
  color: string;
  private engine: EngineService;

  private car: HTMLElement | undefined;
  private flag: HTMLElement | undefined;
  idAnimation: number | null;

  constructor(props: ICars) {
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
    this.idAnimation = null;

    this.engine = new EngineService();
  }

  render(container: HTMLElement) {
    this.car = document.createElement('li');
    const carName = document.createElement('p');
    this.flag = document.createElement('li');

    this.car.classList.add('item-car__image');
    carName.classList.add('car__title');
    this.flag.classList.add(`flag`);

    carName.textContent = this.name;

    this.car.insertAdjacentHTML('beforeend', carSvg(this.color));
    container.append(carName);
    container.append(this.car);
    container.append(this.flag);
  }

  async drive() {
    const time = await this.engine.status(this.id, IStatus.started);
    const start = this.car;
    const finish = this.flag;
    const trackDistance: number = getDistance(start!, finish!);
    this.idAnimation = animation(time, start!, trackDistance);
    const timeToSec = +(time / 1000).toFixed(1);
    try {
      await this.engine.status(this.id, IStatus.drive);
      console.log(`${this.id} доехала`);
      if (!state.isWinner) {
        console.log(`победитель`, this.id);
        state.isWinner = true;
        windowWinnerCarRender.render(this.name, timeToSec);
        const response = await winnersService.get(this.id);
        if (response.status === 404) {
          await winnersService.set({ id: this.id, wins: 1, time: timeToSec });
        } else {
          const winnerObj = await response.json();
          console.log(winnerObj.time);

          if (winnerObj.time <= timeToSec) {
            await winnersService.update(this.id, {
              wins: winnerObj.wins + 1,
              time: winnerObj.time,
            });
          } else {
            await winnersService.update(this.id, {
              wins: winnerObj.wins + 1,
              time: timeToSec,
            });
          }
        }
      }
    } catch (error) {
      console.log(`${this.id} сломалась`);
      cancelAnimationFrame(this.idAnimation);
    }
  }
  async stop() {
    cancelAnimationFrame(this.idAnimation!);
    await this.engine.status(this.id, IStatus.stopped);
    this.car!.style.transform = `translate(0px)`;
  }
  async delete() {
    garageRender.render(await carService.delete(this.id));
  }
}

export default CarRender;
