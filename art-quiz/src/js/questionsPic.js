import images from './images';
import { shuffle } from './questionsAuthor';

function randomPic(min, max, noRepeat) {
  let result = Math.round(Math.random() * (max - min) + min);
  if (!noRepeat.includes(result)) {
    return result;
  } else {
    return randomPic(min, max, noRepeat)
  }
}

export class QuestionPictures {
  constructor(i) {
    this.question = `Какая картина принадлежит ${images[i].author}?`;
    this.answerRight = +images[i].imageNum;
    this.firstIncorrectAnswer = randomPic(0, images.length - 1, [+this.answerRight])
    this.secondIncorrectAnswer = randomPic(0, images.length - 1, [+this.answerRight, +this.firstIncorrectAnswer]);
    this.thirdIncorrectAnswer = randomPic(0, images.length - 1, [+this.answerRight, +this.firstIncorrectAnswer, +this.secondIncorrectAnswer]);
    this.answers = shuffle([this.answerRight, this.firstIncorrectAnswer, this.secondIncorrectAnswer, this.thirdIncorrectAnswer]);
  }
  answerCheck(i) {
    return this.answers[i] === this.answerRight ? 1 : 0;
  }
}

