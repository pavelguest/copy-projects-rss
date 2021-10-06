
const x = document.getElementsByClassName("explore-content__overlay");

let i = 0;
let slider;
let img;
let clicked = 0, w, h;
let pos;

function initComparisons() {
  for (i; i < x.length; i++) {
    compareImages(x[i]);
  }
  function compareImages(img) {
    w = img.offsetWidth;
    h = img.offsetHeight;
    img.style.width = (w / 1.64) + "px";
    slider = document.createElement("div");
    slider.setAttribute("class", "explore__img-slider");
    img.parentElement.insertBefore(slider, img);
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 1.64) - (slider.offsetWidth / 2) + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}
window.addEventListener("load", function() {initComparisons()});
//initComparisons();
