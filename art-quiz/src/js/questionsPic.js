import { randomPic, shuffle } from "./helperFunc";
import images from "./images";

const allAnswersPic = images.map((e) => [e.author, e.imageNum]);

let possibleAnswerPic = [];
function getAllRightAnswersPic(author) {
  possibleAnswerPic = [];
  allAnswersPic.filter((elem) => (elem[0] === author) + elem[1]);
  return possibleAnswerPic;
}
export class QuestionPictures {
  constructor(i) {
    this.question = `Какая картина принадлежит ${images[i].author}?`;
    this.answerRight = +images[i].imageNum;
    this.firstIncorrectAnswer = randomPic(
      0,
      images.length - 1,
      [+this.answerRight].concat(getAllRightAnswersPic(images[i].author)),
    );
    this.secondIncorrectAnswer = randomPic(
      0,
      images.length - 1,
      [+this.answerRight, +this.firstIncorrectAnswer].concat(getAllRightAnswersPic(images[i].author)),
    );
    this.thirdIncorrectAnswer = randomPic(
      0,
      images.length - 1,
      [+this.answerRight, +this.firstIncorrectAnswer, +this.secondIncorrectAnswer].concat(
        getAllRightAnswersPic(images[i].author),
      ),
    );
    this.answers = shuffle([
      this.answerRight,
      this.firstIncorrectAnswer,
      this.secondIncorrectAnswer,
      this.thirdIncorrectAnswer,
    ]);
  }

  answerCheck(i) {
    return this.answers[i] === this.answerRight ? 1 : 0;
  }
}
