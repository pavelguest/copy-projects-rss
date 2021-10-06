import Swiper, { Navigation, Pagination } from 'swiper';
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';

  // configure Swiper to use modules
  Swiper.use([Navigation, Pagination]);

const welcomeSwiper = new Swiper('.swiper', {
  speed: 400,
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.slider-nav__dots',
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.welcome-slider__next',
    prevEl: '.welcome-slider__back',
  },
});

const activeSlide = document.querySelector('.counter');
const allSlides =  document.querySelectorAll('.slide');
const countSlides = document.querySelector('.counter-all');
countSlides.textContent = `0${allSlides.length - 2}`;
welcomeSwiper.on('activeIndexChange', function() {
  let currentSlide = ++welcomeSwiper.realIndex;
  activeSlide.innerHTML = `0${currentSlide}`;
});

const videoSwiper = new Swiper('.video-slider', {
  speed: 400,
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.slider-nav__dots',
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.welcome-slider__next',
    prevEl: '.welcome-slider__back',
  },
})

