const ticketsType = document.querySelectorAll('.ticket-type__radio');
const priceOne = document.getElementById('price-one');
const priceTwo = document.getElementById('price-two');
const priceThree = document.getElementById('price-three');
const countBasic = document.getElementById('count-basic');
const countSenior = document.getElementById('count-senior');
const totalTicket = document.querySelector('.total-price');
const buttonsTickets = document.querySelectorAll('.amount-buttons');
const buttonsBuy = document.querySelector('.amount__buy');
const typeTicketsBasic = document.querySelectorAll('.basic-price');
const typeTicketsSenior = document.querySelectorAll('.senior-price');
const sumPriceBasic = document.querySelector('.count-price__basic');
const sumPriceSenior = document.querySelector('.count-price__senior');
const sumBasicTickets = document.querySelector('.count-basic__type');
const sumSeniorTickets = document.querySelector('.count-senior__type');
const countBasicForm = document.getElementById('count-basic__form');
const countSeniorForm = document.getElementById('count-senior__form');
const typeTicketsBuy = document.querySelector('.type-tickets__buy');
const totalForm = document.querySelector('.total-price__form');
const selectedTickets = document.querySelector('.form__selected');

let valueTickets = 20;
let values = {};


if(localStorage.getItem('tickets')) {
  values = JSON.parse(localStorage.getItem('tickets'));
  countBasic.value = values.basicTicket;
  countSenior.value = values.seniorTicket;
  valueTickets = values.typeTicket;
  countBasicForm.value = values.basicTicket;
  countSeniorForm.value = values.seniorTicket;
  changeRadioValues()
  changeTypeTickets()
}
function typeValue() {
  ticketsType.forEach(elem => {
    if (elem.checked) {
      valueTickets = +elem.value;
    }
    totalTickets();
    saveValue(valueTickets, countBasic.value, countSenior.value);
  });
}
function totalTickets() {
  totalTicket.textContent = `${valueTickets * +countBasic.value + (valueTickets / 2) * +countSenior.value}`;
  totalForm.textContent = `${valueTickets * +countBasic.value + (valueTickets / 2) * +countSenior.value}`;
  saveValue(valueTickets, countBasic.value, countSenior.value);
  totalForm.textContent = `${valueTickets * +countBasicForm.value + (valueTickets / 2) * +countSeniorForm.value}`;
};
function changeRadioValues() {
  ticketsType.forEach(el => el.removeAttribute('checked'));
  ticketsType.forEach(el => {
    if(+el.value === values.typeTicket) el.setAttribute('checked', 'checked');
  });
  if (priceOne.checked) {
    typeTicketsBuy.textContent = `Permanent exhibition`;
  } else if (priceTwo.checked) {
    typeTicketsBuy.textContent = `Temporary exhibition`;
  } else if (priceThree.checked) {
    typeTicketsBuy.textContent = `Combined Admission`;
  }
}
function changeTypeTickets() {
  typeTicketsBasic.forEach(elem => elem.textContent = `${values.typeTicket}`);
  typeTicketsSenior.forEach(elem => elem.textContent = `${values.typeTicket / 2}`);
  sumBasicTickets.textContent = `${countBasic.value}`;
  sumSeniorTickets.textContent = `${countSenior.value}`;
  sumPriceBasic.textContent = `${valueTickets * +countBasic.value}`;
  sumPriceSenior.textContent = `${(valueTickets / 2) * +countSenior.value}`;
  countBasicForm.value = values.basicTicket;
  countSeniorForm.value = values.seniorTicket;
  totalTickets();
}
function saveValue(valueType, countBasic, countSenior) {
  values = {
    basicTicket: countBasic,
    seniorTicket: countSenior,
    typeTicket: valueType,
  }
  localStorage.setItem('tickets', JSON.stringify(values));
}
ticketsType.forEach(elem => elem.addEventListener('click', typeValue));
buttonsTickets.forEach(buttonTickets => buttonTickets.addEventListener('click', totalTickets));
buttonsBuy.addEventListener('click', changeRadioValues);
buttonsBuy.addEventListener('click', changeTypeTickets);

totalTickets();
