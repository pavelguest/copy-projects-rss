import {getRandomNum} from './slider.js';
import {langEn} from './settings-page.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

let rotateCurr = 0;
export async function getQuotes() {
  rotateCurr += 180;
  changeQuote.style.transform = `rotate(${rotateCurr}deg)`;
  //changeQuote.classList.toggle('rotate');
  const quotes = './js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuoteNum = getRandomNum(0, Object.keys(data).length);
  if(localStorage.lang === 'en' || langEn.checked) {
    quote.textContent = `${data[randomQuoteNum].textEn}`;
    author.textContent = `${data[randomQuoteNum].authorEn}`;
  } else {
    quote.textContent = `${data[randomQuoteNum].textRu}`;
    author.textContent = `${data[randomQuoteNum].authorRu}`;
  }



}


changeQuote.addEventListener('click', getQuotes);

getQuotes();







