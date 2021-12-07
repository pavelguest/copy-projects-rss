import images from './images';
import { shuffle } from './questionsAuthor';

const allAnswersPic = [];

images.forEach(e => {
  allAnswersPic.push([e.author, e.imageNum]);
});

let possibleAnswerPic = [];
function getAllRightAnswersPic(author) {
  possibleAnswerPic = [];
  for (let i = 0; i < allAnswersPic.length; i++) {
    if(allAnswersPic[i][0] === author) {
      possibleAnswerPic.push(+allAnswersPic[i][1]);
    }
  }
  return possibleAnswerPic;
}

function randomPic(min, max, noRepeat) {
  const result = Math.round(Math.random() * (max - min) + min);
  if (!noRepeat.includes(result)) {
    return result;
  } 
    return randomPic(min, max, noRepeat);
  
}

export class QuestionPictures {
  constructor(i) {
    this.question = `Какая картина принадлежит ${images[i].author}?`;
    this.answerRight = +images[i].imageNum;
    this.firstIncorrectAnswer = randomPic(0, images.length - 1, [+this.answerRight].concat(getAllRightAnswersPic(images[i].author)));
    this.secondIncorrectAnswer = randomPic(0, images.length - 1, [+this.answerRight, +this.firstIncorrectAnswer].concat(getAllRightAnswersPic(images[i].author)));
    this.thirdIncorrectAnswer = randomPic(0, images.length - 1, [+this.answerRight, +this.firstIncorrectAnswer, +this.secondIncorrectAnswer].concat(getAllRightAnswersPic(images[i].author)));
    this.answers = shuffle([this.answerRight, this.firstIncorrectAnswer, this.secondIncorrectAnswer, this.thirdIncorrectAnswer]);
  }

  answerCheck(i) {
    return this.answers[i] === this.answerRight ? 1 : 0;
  }
}

