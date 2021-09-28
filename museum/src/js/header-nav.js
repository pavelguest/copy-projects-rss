"use strict"

const menuLinks = document.querySelectorAll('.link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(link => {
    link.addEventListener('click', linkClick);
  });
  function linkClick(event) {
    const link = event.target;
    if (link.dataset.goto && document.querySelector(link.dataset.goto)) {
      const gotoBlock = document.querySelector(link.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

      if (iconMenu.classList.contains('_active')) {
     //   document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }
      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth'
      });
      event.preventDefault();
    }
  }
}
//---------------//
const iconMenu = document.querySelector('.header-menu__icon');
const menuBody = document.querySelector('.header-nav');
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
 //   document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  })
}
