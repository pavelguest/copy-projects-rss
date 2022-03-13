const randomColor = () =>
  '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

const randomCars = (arr: string[], min: number, max: number) =>
  arr[Math.round(Math.random() * (max - min) + min)];

function animation(
  animationTime: number,
  startPoint: HTMLElement,
  distance: number
) {
  let isDrive = true;
  let animationFrameId: null | number = null;
  let startTime: null | number = null;

  function step(currentTime: number) {
    if (!startTime) {
      startTime = currentTime;
    }

    const time = currentTime - startTime;
    const passed = Math.floor(time * (distance / animationTime));
    startPoint.style.transform = `translate(${Math.min(passed, distance)}px)`;

    if (passed < distance && isDrive) {
      animationFrameId = window.requestAnimationFrame(step);
    }
  }
  animationFrameId = window.requestAnimationFrame(step);

  return () => {
    isDrive = false;
    cancelAnimationFrame(animationFrameId!);
  };
}

const getPositionAtCenter = (item: Element) => {
  const { top, left } = item.getBoundingClientRect();
  return { x: left, y: top };
};

const getDistanceBetweenElement = (a: Element, b: Element): number => {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);
  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
};

const getDistance = (car: HTMLElement, finish: HTMLElement) => {
  return Math.floor(getDistanceBetweenElement(car, finish));
};

export { randomColor, randomCars, animation, getDistance };
