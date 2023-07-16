const container = document.querySelector(".container");
const screen = container.querySelector(".screen");
const numbers = container.querySelectorAll(".number");
const operators = container.querySelectorAll(".operator");

let firstNumber = 0;
let checkOperator = false;
let lastOperator = "";
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (screen.innerText.length > 9) return;
    let clickNumber = e.target.innerText;
    if (clickNumber === ".") {
      if (screen.innerText.includes(".")) return;
    }
    if (clickNumber === "0" && screen.innerText === "0") return;
    let firstNumber = screen.innerText[0];
    if (firstNumber === "0") {
      screen.innerText = clickNumber;
    } else {
      screen.innerText += clickNumber;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    let clickOperator = e.target.innerText;

    if (clickOperator === "AC") {
      screen.innerText = "0";
      firstNumber = 0;
      checkOperator = false;
      return;
    }

    if (clickOperator === "=") {
      if (checkOperator) {
        switch (lastOperator) {
          case "+":
            firstNumber =Math.round(
                (Number(firstNumber.toFixed(1)) +
                  Number(Number(screen.innerText).toFixed(1))) * 10) / 10;
            break;
          case "-":
            firstNumber =Math.round(
                (Number(firstNumber.toFixed(1)) -
                  Number(Number(screen.innerText).toFixed(1))) * 10) / 10;
            break;
          case "x":
            firstNumber =firstNumber * Number(screen.innerText);
            break;
          case "/":
            firstNumber =firstNumber / Number(screen.innerText);
            break;
        }
        screen.innerText = firstNumber;
        checkOperator = false;
      }
    } else {
      firstNumber = Number(screen.innerText);
      screen.innerText = "0";
      lastOperator = clickOperator;
      checkOperator = true;
    }
  });
});
