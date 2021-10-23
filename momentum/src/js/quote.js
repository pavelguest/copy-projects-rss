import {getRandomNum} from './slider.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

export async function getQuotes() {
  const quotes = './js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuoteNum = getRandomNum(0, Object.keys(data).length);
  if(localStorage.lang === 'en') {
    quote.textContent = `${data[randomQuoteNum].textEn}`;
    author.textContent = `${data[randomQuoteNum].authorEn}`;
  } else {
    quote.textContent = `${data[randomQuoteNum].textRu}`;
    author.textContent = `${data[randomQuoteNum].authorRu}`;
  }



}


changeQuote.addEventListener('click', getQuotes);

getQuotes();







