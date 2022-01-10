import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';

export const rangeYear = <target>document.getElementById('range-year');
export const rangeCount = <target>document.getElementById('range-count');

noUiSlider.create(rangeYear, {
  range: {
    min: 1940,
    max: 2020,
  },
  step: 10,
  start: [1940, 2020],
  connect: true,
});

noUiSlider.create(rangeCount, {
  range: {
    min: 1,
    max: 12,
  },
  step: 1,
  start: [1, 12],
  connect: true,
});

class NoUiSlider {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }
  // create() {
  //   NoUiSlider.create(this.element, {
  //     range: {
  //       min: 1940,
  //       max: 2020,
  //     },
  //     step: 10,
  //     start: [1940, 2020],
  //     connect: true,
  //   });
  // }
}
