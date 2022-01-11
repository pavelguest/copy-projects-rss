import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
class Slider {
  rangeYear = <target>document.getElementById('range-year');
  rangeCount = <target>document.getElementById('range-count');

  constructor() {}
  create() {
    noUiSlider.create(this.rangeYear, {
      range: {
        min: 1940,
        max: 2020,
      },
      step: 10,
      start: [1940, 2020],
      connect: true,
    });

    noUiSlider.create(this.rangeCount, {
      range: {
        min: 1,
        max: 12,
      },
      step: 1,
      start: [1, 12],
      connect: true,
    });
  }
  defaultRange() {
    this.rangeCount.noUiSlider!.updateOptions(
      {
        start: [1, 12],
      },
      true
    );
    this.rangeYear.noUiSlider!.updateOptions(
      {
        start: [1940, 2020],
      },
      true
    );
  }
  loadRangeSlider(
    minCount: string,
    maxCount: string,
    minYear: string,
    maxYear: string
  ): void {
    this.rangeCount.noUiSlider!.updateOptions(
      {
        start: [minCount, maxCount],
      },
      true
    );
    this.rangeYear.noUiSlider!.updateOptions(
      {
        start: [minYear, maxYear],
      },
      true
    );
  }
}

export const slider = new Slider();
slider.create();
