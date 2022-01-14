import { randomAuthors, shuffle } from "./helperFunc";
const { default: images } = require("./images");

const authors = images.map((e) => e.author);
const authorSet = new Set(authors);
const authorArr = Array.from(authorSet);
export class QuestionAuthor {
  constructor(i) {
    this.question = images[i].imageNum;
    this.answerRight = images[i].author;
    this.firstIncorrectAnswer = randomAuthors(0, authorArr.length - 1, [this.answerRight], authorArr);
    this.secondIncorrectAnswer = randomAuthors(
      0,
      authorArr.length - 1,
      [this.answerRight, this.firstIncorrectAnswer],
      authorArr,
    );
    this.thirdIncorrectAnswer = randomAuthors(
      0,
      authorArr.length - 1,
      [this.answerRight, this.firstIncorrectAnswer, this.secondIncorrectAnswer],
      authorArr,
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
