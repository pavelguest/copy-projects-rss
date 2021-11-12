export const openSettingsMenu = document.querySelector('.main-menu__settings-ico');
export const backSettingsMenu = document.querySelector('.settings-menu__ico-back');
export const closeSettingsMenu = document.querySelector('.settings-menu__ico-close');
export const mainMenu = document.querySelector('.main-menu');
export const settingsMenu = document.querySelector('.settings-menu');




function openSettings() {
  mainMenu.style.display = 'none';
  settingsMenu.style.display = 'flex';
}
function closeSettings() {
  mainMenu.style.display = 'flex';
  settingsMenu.style.display = 'none';
}


openSettingsMenu.addEventListener('click', openSettings);
backSettingsMenu.addEventListener('click', closeSettings);
closeSettingsMenu.addEventListener('click', closeSettings);
