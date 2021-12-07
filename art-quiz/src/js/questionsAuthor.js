const { default: images } = require("./images");

const authors = images.map(e => e.author);
const authorSet = new Set(authors);
const authorArr = Array.from(authorSet);

export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function randomAuthors(min, max, noRepeat) {
  const result = authorArr[Math.round(Math.random() * (max- min) + min)];
  if(!noRepeat.includes(result)) {
    return result;
  }
    return randomAuthors(min, max, noRepeat);

}

export class QuestionAuthor {
  constructor(i) {
    this.question = images[i].imageNum;
    this.answerRight = images[this.question].author;
    this.firstIncorrectAnswer = randomAuthors(0, authorArr.length - 1,[this.answerRight]);
    this.secondIncorrectAnswer = randomAuthors(0, authorArr.length - 1, [this.answerRight, this.firstIncorrectAnswer]);
    this.thirdIncorrectAnswer = randomAuthors(0, authorArr.length - 1, [this.answerRight, this.firstIncorrectAnswer, this.secondIncorrectAnswer]);
    this.answers = shuffle([this.answerRight, this.firstIncorrectAnswer, this.secondIncorrectAnswer, this.thirdIncorrectAnswer]);
  }

  answerCheck(i) {
    return this.answers[i] === this.answerRight ? 1 : 0;
  }
}
