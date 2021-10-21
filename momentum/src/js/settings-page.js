const settingsButton = document.querySelector('.settings__button');
const closeButton = document.querySelector('.settings__button-close');
const settingsPopap = document.querySelector('.popap-container');


function open() {
  settingsPopap.classList.add('open');
   settingsPopap.addEventListener('click', function (e) {
     if (!e.target.closest('.container')) {
      settingsPopap.classList.remove('open');
     }
   })
}
function close() {
  settingsPopap.classList.remove('open');
}
settingsButton.addEventListener('click', open);
closeButton.addEventListener('click', close);
