import {getRandomNum} from './slider.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  const quotes = '../js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuoteNum = getRandomNum(0, Object.keys(data).length);
  quote.textContent = `${data[randomQuoteNum].text}`;
  author.textContent = `${data[randomQuoteNum].author}`;

}

getQuotes();

changeQuote.addEventListener('click', getQuotes);








