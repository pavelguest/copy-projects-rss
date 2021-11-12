import images from './images';
import { categoryContainer } from './category';
import { Category } from './category';

class Questions {
  constructor(i) {
    this.question = images[i].imageNum;
    this.answerRight = images[this.question].author;
  }
}

let a = new Questions(1)
console.log(a)



categoryContainer.addEventListener('click', e => {
  const arrList = Array.from(document.querySelectorAll('.category__img'));
  const listItem = arrList.indexOf(e.target);
  if(listItem || listItem == 0) {
    let a = new Category(listItem, images)
    console.log(a.questions)
  }
})
