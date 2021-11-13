import images from './images';
import { categoryContainer } from './category';
import { Category } from './category';
import { QuestionAuthor } from './questionsAuthor';
import { QuestionPictures } from './questionsPic';

let questions = [];
let category = [];
for (let i = 0; i < 120; i++) {
  questions.push(new QuestionAuthor(i));
}
for (let i = 0; i < 12; i++) {
  category.push(new Category(i, questions));
}

console.log(questions)
console.log(category)

categoryContainer.addEventListener('click', e => {
  const arrList = Array.from(document.querySelectorAll('.category__img'));
  const listItem = arrList.indexOf(e.target);
  if(listItem || listItem == 0) {
    let a = new Category(listItem, images)
    a.questions.forEach( e => {
      console.log(e)
    });
    console.log(a.questions)
  }
})
