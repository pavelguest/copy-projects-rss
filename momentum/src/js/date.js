const dateNow = document.querySelector('.date');

function showDate() {
  const date = new Date();
  const options = {weekday:'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  dateNow.textContent = currentDate;
}

showDate();

