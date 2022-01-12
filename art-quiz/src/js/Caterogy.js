class Category {
  constructor(type, questions) {
    this.type = type;
    this.questions = questions.slice(type * 10, type * 10 + 10);
    this.score = 0;
    this.current = 0;
  }

  next() {
    if (this.current > 9) {
      this.end();
    } else {
      this.current += 1;
      return this.current;
    }
  }

  scoreQuiz(index) {
    const value = this.questions[this.current].answerCheck(index);
    this.score += value;
    let correct = -1;
    if (value >= 1) {
      correct = index;
    } else {
      const answersArr = [...this.questions[this.current].answers];
      correct = answersArr.findIndex((answer) => answer === this.questions[this.current].answerRight);

      // for (let i = 0; i < this.questions[this.current].answers.length; i++) {
      //   if (this.questions[this.current].answers[i] === this.questions[this.current].answerRight) {
      //     correct = i;
      //     break;
      //   }
      // }
    }
    return correct;
  }

  end() {
    console.log(this.score);
  }
}
export default Category;
