
import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';

export var rangeYear = <target>document.getElementById('range-year');
export var rangeCount = <target>document.getElementById('range-count');

noUiSlider.create(rangeYear, {
    range: {
        'min': 1940,
        'max': 2020
    },
    step: 10,
    start: [1940, 2020],
    connect: true,

});

noUiSlider.create(rangeCount, {
  range: {
    'min': 1,
    'max': 12
  },
  step: 1,
  start: [1, 12],
  connect: true,

});

