function Question(questionText, options, answerOption) {
    this.questionText = questionText;
    this.options = options;
    this.answerOption = answerOption;
  }
  
  Question.prototype.checkAnswer = function (answer) {
    return answer === this.answerOption;
  };
  
  let questions = [
    new Question("1-Soru", { a: "A", b: "B", c: "C", d: "D" }, "c"),
    new Question("2-Soru", { a: "A", b: "B", c: "C", d: "D" }, "d"),
    new Question("3-Soru", { a: "A", b: "B", c: "C", d: "D" }, "c"),
    new Question("4-Soru", { a: "A", b: "B", c: "C", d: "D" }, "d"),
  ];