import Swiper, { Navigation, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
//import 'swiper/css/pagination';

// configure Swiper to use modules
Swiper.use([Navigation, Scrollbar]);

const newSwiper = new Swiper('.swiper', {
  // speed: 200,
  slidesPerView: 7,
  spaceBetween: 20,
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});
