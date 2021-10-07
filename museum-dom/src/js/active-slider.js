import Swiper, { Navigation, Pagination } from 'swiper';
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';

  // configure Swiper to use modules
  Swiper.use([Navigation, Pagination]);

const welcomeSwiper = new Swiper('.swiper', {
  speed: 1000,
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
  slidesPerView: 2,
  spaceBetween: 20,
  breakpoints: {
    769: {
      slidesPerView: 3,
      spaceBetween: 42,
    }
  },
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.vslider-nav__dots',
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.video-slider__btn-next',
    prevEl: '.video-slider__btn-back',
  },
});

const videoArray = [
  './assets/video/video0.mp4',
  './assets/video/video1.mp4',
  './assets/video/video2.mp4',
  './assets/video/video3.mp4',
  './assets/video/video4.mp4'];
const videoPoster = [
  './assets/video//poster0.jpg',
  './assets/video//poster1.jpg',
  './assets/video//poster2.jpg',
  './assets/video//poster3.jpg',
  './assets/video//poster4.jpg',];

  videoSwiper.on('activeIndexChange', function () {
    let currentVideoSlide = videoSwiper.realIndex;
    let videoSrc = document.querySelector('.v-slide');
    videoSrc.setAttribute('src', videoArray[currentVideoSlide]);
    videoSrc.setAttribute('poster', videoPoster[currentVideoSlide]);
   
  });


