function UI() {
  (this.btn_start = document.querySelector(".btn_start")),
    (this.btn_next = document.querySelector(".next_btn")),
    (this.btn_reply = document.querySelector(".btn_replay")),
    (this.btn_quit = document.querySelector(".btn_quit")),
    (this.quiz_box = document.querySelector(".quiz_box")),
    (this.score_box = document.querySelector(".score_box")),
    (this.option_list = document.querySelector(".option_list"));
  (this.time_text = document.querySelector(".time_text")),
    (this.time_second = document.querySelector(".time_second"));
    this.time_line = document.querySelector(".time_line")
}

UI.prototype.showQuestion = function (question) {
  /*
      const questionTextSpan = document.createElement("span");
      questionTextSpan.textContent = questionText;
      document.querySelector(".question_text").appendChild(questionTextSpan);
  
      for (let option in options) {
        const optionDiv = document.createElement("div");
        const optionSpan = document.createElement("span");
        const optionIconDiv = document.createElement("div");
        const optionIconI = document.createElement("i");
        optionDiv.classList.add("option");
        optionDiv.appendChild(optionSpan);
        optionDiv.appendChild(optionIconDiv);
        optionSpan.textContent = option.toUpperCase() + ": " + options[option];
        optionIconDiv.classList.add("icon");
        optionIconI.classList.add("fas");
        if (answerOption === options[option]) optionIconI.classList.add("fa-check");
        else optionIconI.classList.add("fa-times");
  
        optionIconDiv.appendChild(optionIconI);
        document.querySelector(".option_list").appendChild(optionDiv);
      }
    */
  this.showQuestionNumber();
  startTimer(10);
  startTimerLine();
  this.btn_next.classList.add("hidden");
  if (quiz.questionIndex === questions.length - 1)
    this.btn_next.textContent = "Finish";

  let questionText = `<span>${question.questionText}</span>`;
  let optionsText = "";

  for (let option in question.options) {
    let icon;
    if (
      question.answerOption.toUpperCase() ===
      question.options[option].toUpperCase()
    )
      icon = "fa-check";
    else icon = "fa-times";
    optionsText += `
                  <div class="option"> 
                      <span><b>${option}</b>: ${question.options[option]}</span>
                      <div class="icon hidden"> <i class="fas ${icon}"></i> </div>
                  </div>
              `;
  }

  document.querySelector(".question_text").innerHTML = questionText;
  this.option_list.innerHTML = optionsText;

  const options = this.option_list.querySelectorAll(".option");

  for (let option of options) {
    option.setAttribute("onclick", "optionSelected(this)");
  }
};

UI.prototype.showQuestionNumber = function () {
  let tag = `<span class="badge bg-warning">${quiz.questionIndex + 1} / ${
    questions.length
  }</span>`;

  document.querySelector(".question_index").innerHTML = tag;
};

UI.prototype.showScore = function (totalQuestionCount, correctAnswerCount) {
  let tag = `You answered ${correctAnswerCount} of ${totalQuestionCount} questions correctly.`;
  document.querySelector(".score_box .score_text").innerHTML = tag;
};
