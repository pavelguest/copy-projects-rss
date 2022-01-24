class WindowWinnerCarRender {
  render(name: string, time: number) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const popupTitle = document.createElement('div');
    popupTitle.classList.add('popup__title');
    popupTitle.textContent = `${name} wins, with time ${time} s`;
    const popupButton = document.createElement('button');
    popupButton.classList.add('popup__button');
    popupButton.textContent = `OK`;
    popup.append(popupTitle);
    popup.append(popupButton);
    (document.querySelector('#reset') as HTMLButtonElement).disabled = true;
    popupButton.addEventListener('click', () => {
      popup.remove();
      document.querySelectorAll('button').forEach((button) => {
        button.disabled = false;
      });
      document.querySelectorAll('.start-car').forEach((button) => {
        if (button instanceof HTMLButtonElement) button.disabled = true;
      });
      document.querySelectorAll('.stop-car').forEach((button) => {
        if (button instanceof HTMLButtonElement) button.disabled = true;
      });
      (document.querySelector('#reset') as HTMLButtonElement).disabled = false;
      (document.querySelector('#race') as HTMLButtonElement).disabled = true;
    });
    document.body.append(popup);
  }
}

const windowWinnerCarRender = new WindowWinnerCarRender();

export default windowWinnerCarRender;
