const pictureInnerContainer = document.querySelector('.picture-inner-container');




function debounce(func, wait=20, immediate=true) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

const galleryScroll = document.querySelectorAll('.gallery-img');

function checkGallery(e) {
  galleryScroll.forEach(imgGallery => {
    const imageInAt = (window.scrollY + window.innerHeight) - imgGallery.height / 2;
    const imageBottom = imgGallery.offsetTop + imgGallery.height;
    const centerImage = imageInAt > imgGallery.offsetTop;
    const isNotScrollPast = window.scrollY < imageBottom;
    if (centerImage && isNotScrollPast) {
      imgGallery.classList.add('active-img');
    } else {
      imgGallery.classList.remove('active-img');
    }
  });
}

window.addEventListener('scroll', debounce(checkGallery));


let array = [
  'assets/img/gallery/galery1.jpg',
  'assets/img/gallery/galery2.jpg',
  'assets/img/gallery/galery3.jpg',
  'assets/img/gallery/galery4.jpg',
  'assets/img/gallery/galery5.jpg',
  'assets/img/gallery/galery6.jpg',
  'assets/img/gallery/galery7.jpg',
  'assets/img/gallery/galery8.jpg',
  'assets/img/gallery/galery9.jpg',
  'assets/img/gallery/galery10.jpg',
  'assets/img/gallery/galery11.jpg',
  'assets/img/gallery/galery12.jpg',
  'assets/img/gallery/galery13.jpg',
  'assets/img/gallery/galery14.jpg',
  'assets/img/gallery/galery15.jpg'];

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    array.map( function shuffleIndex (elem, i) {
    const img = document.createElement('img');
    img.classList.add('gallery-img');
    img.src = elem;
    img.alt = `galery1`;
    pictureInnerContainer.append(img);
  });
  };

shuffle(array);

//------------------------------------//
