const booking = document.querySelector('.booking-tickets');
const closeButton = document.querySelector('.booking-tickets__close');
const button = document.querySelector('.amount__buy');
const body = document.querySelector('body');

function open() {
   booking.classList.add('open');
}
function close() {
    booking.classList.remove('open');
}
button.addEventListener('click', open);
closeButton.addEventListener('click', close);

