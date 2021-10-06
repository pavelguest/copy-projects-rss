const progress = document.querySelector('.progress');
const progressVol = document.querySelector('.progress-vol');

function change() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
}
progress.addEventListener('input', change);
progressVol.addEventListener('input', change);
