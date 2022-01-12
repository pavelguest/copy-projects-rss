import Swiper, { Navigation, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

Swiper.use([Navigation, Scrollbar]);

const newSwiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  breakpoints: {
    769: {
      slidesPerView: 7,
    },
  },
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});
