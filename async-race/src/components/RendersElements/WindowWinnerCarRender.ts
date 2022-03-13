import garageRender from '../render/GarageRender';

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
    garageRender.garageRaceControls!.stopCarsButton!.disabled = true;
    popupButton.addEventListener('click', () => {
      popup.remove();
      document.querySelectorAll('button').forEach((button) => {
        button.disabled = false;
      });
      garageRender.arrTracks.forEach((track) => {
        track.raceCarButton!.disabled = true;
        track.stopCarButton!.disabled = true;
      });
      garageRender.garageRaceControls!.stopCarsButton!.disabled = false;
      garageRender.garageRaceControls!.raceCarsButton!.disabled = true;
    });
    document.body.append(popup);
  }
}

const windowWinnerCarRender = new WindowWinnerCarRender();

export default windowWinnerCarRender;
