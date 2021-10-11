function scrollTo(to, duration = 700) {
  const element = document.scrollingElement || document.documentElement;
  const start = element.scrollTop;
  const change = to - start;
  const startDate = +new Date();
  const easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
      };
  const animateScroll = function () {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
    else {
      element.scrollTop = to;
    }
      };
  animateScroll();
}
document.addEventListener('DOMContentLoaded', function () {
  let btn = document.querySelector('#to-top');
  window.addEventListener('scroll', function () {
      if (pageYOffset > 100) {
          btn.classList.add('show');
      } else {
          btn.classList.remove('show');
      }
  });
  btn.onclick = function (click) {
      click.preventDefault();
      scrollTo(0, 400);
  }
});
