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
    popupButton.addEventListener('click', () => {
      popup.remove();
    });
    document.body.append(popup);
  }
}

const windowWinnerCarRender = new WindowWinnerCarRender();

export default windowWinnerCarRender;
