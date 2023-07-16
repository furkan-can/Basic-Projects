const ui = new UI();
const quiz = new Quiz(questions);

ui.btn_start.addEventListener("click", function () {
  ui.quiz_box.classList.add("active");
  ui.showQuestion(quiz.getQuestion());
});

ui.btn_next.addEventListener("click", function () {
  if (quiz.questionIndex + 1 < questions.length) {
    quiz.questionIndex += 1;
    ui.showQuestion(quiz.getQuestion());
  } else {
    console.log("Quiz finished.");
    ui.quiz_box.classList.remove("active");
    ui.score_box.classList.add("active");
    ui.showScore(quiz.questions.length, quiz.correctAnswerCount);
  }
});

function optionSelected(option) {
  clearInterval(counter);
  clearInterval(counterLine);
  ui.time_second.textContent = "-";
  ui.btn_next.classList.remove("hidden");
  let answeredQuestion = quiz.getQuestion();
  let selectedOption = option.querySelector("span b").textContent;
  const selectedAnswerIcon = option.querySelector(".icon");

  if (answeredQuestion.checkAnswer(selectedOption)) {
    option.classList.add("correct");
    quiz.correctAnswerCount++;
    selectedAnswerIcon.classList.remove("hidden");
  } else {
    showAnswers(answeredQuestion);
  }
}

ui.btn_quit.addEventListener("click", function () {
  window.location.reload();
});

ui.btn_reply.addEventListener("click", function () {
  quiz.questionIndex = 0;
  quiz.correctAnswerCount = 0;
  ui.btn_start.click();
  ui.score_box.classList.remove("active");
  ui.btn_next.textContent = "Next";
});

let counter;
function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    ui.time_text.textContent = "Time Left";
    ui.time_second.textContent = time-- + "s";

    if (time < 0) {
      clearInterval(counter);
      ui.time_second.textContent = "x";
      ui.time_text.textContent = "The time is over";
      showAnswers(quiz.getQuestion());
      ui.btn_next.classList.remove("hidden");
    }
  }
}

function showAnswers(answeredQuestion) {
  const options = ui.option_list.querySelectorAll(".option");

  for (let foroption of options) {
    if (
      answeredQuestion.checkAnswer(
        foroption.querySelector("span b").textContent
      )
    ) {
      foroption.classList.add("correct");
    } else {
      foroption.classList.add("incorrect");
    }
    foroption.querySelector(".icon").classList.remove("hidden");
  }

  for (let option of options) {
    option.classList.add("disabled");
  }
}

let counterLine;
function startTimerLine() {
    let line_width = 0;

    counterLine = setInterval(timer, 20);

    function timer() {
        line_width += 1;
        ui.time_line.style.width = line_width + "px";

        if(line_width > 549) {
            clearInterval(counterLine);
        }
    }
}
