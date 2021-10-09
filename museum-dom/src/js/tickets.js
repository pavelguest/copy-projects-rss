const priceOne = document.getElementById('price-one');
const priceTwo = document.getElementById('price-two');
const priceThree = document.getElementById('price-three');
const countBasic = document.getElementById('count-basic');
const countSenior = document.getElementById('count-senior');
const buttonsTickets = document.querySelectorAll('.amount-buttons');
const ticketsPrice = document.querySelectorAll('.ticket-type__radio');

let total = 0;
let totalBasic = 0;
let totalSenior = 0;

function totalTickets() {
  if (priceOne.checked) {
    totalBasic = priceOne.value * countBasic.value;
    totalSenior = (priceOne.value * countSenior.value) / 2;
  } else if (priceTwo.checked) {
    totalBasic = priceTwo.value * countBasic.value;
    totalSenior = (priceTwo.value * countSenior.value) / 2;
  } else if (priceThree.checked) {
    totalBasic = priceThree.value * countBasic.value;
    totalSenior = (priceThree.value * countSenior.value) / 2;
  }
    total = totalBasic + totalSenior;
    console.log(total)
    document.querySelector('.total-price').textContent = `${total}`;

};


buttonsTickets.forEach(buttonTickets => buttonTickets.addEventListener('click', totalTickets));
ticketsPrice.forEach(price => price.addEventListener('click', totalTickets));
